import { Router } from "express";
import config from "../config";
import db from "../db/connection";
import Compra from "../models/ingreso";
import Inventario_kardex from "../models/inventario_kardex";
import Movimiento from "../models/contabilidad/movimiento";
import kardexController from "../controllers/kardexController";
import Detalle_ingreso from "../models/detalle_ingreso";
import Producto from "../models/producto";
import Sequelize from "sequelize";
const router = Router();

//Get all compras
router.get("/", async (req, res) => {
  const { query } = req;
  console.log(query);

  const compras = await Compra.findAll({
    attributes: {
      exclude: ["updatedAt", "deletedAt"],
    },
    where: query,
  });
  res.json(compras);
});

//Get detalle compras
router.get("/detalle", async (req, res) => {
  const { query } = req;
  console.log("detalle");

  const detalle = await Detalle_ingreso.findAll({
    attributes: [
      [Sequelize.literal("ingreso_id"), "fc"],
      "id",
      [Sequelize.col("Producto.codigo"), "codigo"],
      [Sequelize.col("Producto.nombre"), "nombre"],
      "cantidad",
      "costo_total",
    ],
    include: [
      {
        model: Producto,
        attributes: [],
      },
    ],
    order: ["ingreso_id"],
    where: query,
  });
  res.json(detalle);
});

//Get last compra
router.get("/last", async (req, res) => {
  const compras = await Compra.findOne({
    attributes: ["id"],
    order: [["createdAt", "DESC"]],
  });
  res.json(compras);
});

//Get one compra for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const compra = await Compra.findByPk(id);

  if (compra) {
    res.json(compra);
    console.log(compra);
  } else {
    res.status(404).json({ msg: `No existe una compra con el id ${id}` });
  }
});

//Create one compra
router.post("/", async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    let kardex_product = [];

    //Calcula nuevo saldo y valor prom para kardex
    for (let index = 0; index < body.detalle_ingreso.length; index++) {
      const element = body.detalle_ingreso[index];
      const result = (await kardexController.getLastKardex(
        element.producto_id
      )) || {
        saldo: 0,
        costo_promund: 0,
      };
      const totalsaldo = Number(result.costo_promund) * Number(result.saldo);
      const newsaldo = Number(result.saldo) + element.cantidad;
      const newcosto_prom = (totalsaldo + element.costo_total) / newsaldo;

      kardex_product.push({
        producto_id: element.producto_id,
        tipo_comprobante: "compra",
        cantidad: element.cantidad,
        valor_und: element.costo_total / element.cantidad,
        saldo: newsaldo,
        costo_promund: newcosto_prom,
      });
    }
    //Termina calculo

    const result = await db.transaction(async (t) => {
      const compra = await Compra.create(body, {
        include: "detalle_ingreso",
        transaction: t,
      });

      await Inventario_kardex.bulkCreate(kardex_product, {
        transaction: t,
      });

      //movimiento
      const mov_compra = [
        //Movimiento inventario
        {
          cuentacontable_id: config.cuentas.inventario,
          detalle: "ingreso inv FC" + compra.id,
          debito: compra.total,
          usuario_id: 1,
        },
        //Movimiento Iva
        {
          cuentacontable_id: config.cuentas.ivacompra,
          detalle: "iva compra FC" + compra.id,
          debito: compra.impuesto || 0,
          usuario_id: 1,
        },
      ];
      //movimiento
      const movimiento_contable = {
        efectivo: [
          ...mov_compra,
          //salida de efectivo
          {
            cuentacontable_id: config.cuentas.efectivo,
            detalle: "Compra efectivo FC" + compra.id,
            credito: compra.total + compra.impuesto,
            usuario_id: 1,
          },
        ],
        credito: [
          ...mov_compra,
          //Pasivo proveeedor
          {
            cuentacontable_id: config.cuentas.proveedor,
            detalle: "Cuenta por pagar Proveedor" + compra.proveedor_id,
            credito: compra.total + compra.impuesto,
            usuario_id: 1,
          },
        ],
      };

      await Movimiento.bulkCreate(movimiento_contable[body.tipo], {
        transaction: t,
      });

      return compra;
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create compra" });
  }
});

//Edit Compra
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const compra = await Compra.findByPk(id);

    if (!compra) {
      return res.status(404).json({
        msg: "No existe una compra con el id " + id,
      });
    }

    await compra.update(body);
    res.json(compra);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit compra" });
  }
});

//Delete secure Compra
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const compra = await Compra.findByPk(id);

    if (!compra) {
      return res.status(404).json({
        msg: "No existe una compra con el id " + id,
      });
    }

    await compra.destroy();
    res.json({ msg: "Delete secure compra as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Compra" });
  }
});

//Delete hard Compra
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const compra = await Compra.findByPk(id);

    if (!compra) {
      return res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }

    await compra.destroy({ force: true });
    res.json({ msg: "Compra completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard compra as sucefuly" });
  }
});

export default router;
