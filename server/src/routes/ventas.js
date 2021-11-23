import { Router } from "express";
import config from "../config";
import db from "../db/connection";
import Venta from "../models/venta";
import Inventario_kardex from "../models/inventario_kardex";
import Movimiento from "../models/contabilidad/movimiento";
import kardexController from "../controllers/kardexController";
const router = Router();

//Get all ventas
router.get("/", async (req, res) => {
  const ventas = await Venta.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });
  res.json(ventas);
});

//Get last ventas
router.get("/last", async (req, res) => {
  const ventas = await Venta.findOne({
    attributes: ["id"],
    order: [["createdAt", "DESC"]],
  });
  res.json(ventas);
});

//Get one venta for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const venta = await Venta.findByPk(id);

  if (venta) {
    res.json(venta);
    console.log(venta);
  } else {
    res.status(404).json({ msg: `No existe una venta con el id ${id}` });
  }
});

//Create one venta
router.post("/", async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    let kardex_product = [];

    //Calcula nuevo saldo y valor prom para kardex
    for (let index = 0; index < body.detalle_venta.length; index++) {
      const element = body.detalle_venta[index];

      const result = (await kardexController.getLastKardex(
        element.producto_id
      )) || {
        saldo: 0,
        costo_promund: 0,
      };

      //Calcular nuevos saldos
      const newsaldo = Number(result.saldo) - element.cantidad;

      kardex_product.push({
        producto_id: element.producto_id,
        tipo_comprobante: "venta",
        cantidad: -element.cantidad,
        valor_und: element.precio_total / element.cantidad,
        saldo: newsaldo,
        costo_promund: Number(result.costo_promund),
      });
    }

    //Calcular costo de venta
    let total_costoventa =
      -kardex_product[0].cantidad * kardex_product[0].costo_promund;

    if (kardex_product.length > 1) {
      total_costoventa = kardex_product.reduce((acc, cur) => {
        return (
          -acc.cantidad * acc.costo_promund + -cur.cantidad * cur.costo_promund
        );
      });
    }

    //Querys
    const result = await db.transaction(async (t) => {
      //Crear nueva venta
      const venta = await Venta.create(body, {
        include: "detalle_venta",
        transaction: t,
      });
      //Movimiento kardex
      await Inventario_kardex.bulkCreate(kardex_product, {
        transaction: t,
      });

      // Movimiento contable
      const mov_venta = [
        //Movimiento inventario
        {
          cuentacontable_id: config.cuentas.ivaventa,
          detalle: "iva venta FV" + venta.id,
          credito: venta.impuesto || 0,
          usuario_id: 1,
        },
        {
          cuentacontable_id: config.cuentas.cuentaventa,
          detalle: "FV" + venta.id,
          credito: venta.total,
          usuario_id: 1,
        },
        {
          cuentacontable_id: config.cuentas.costoventa,
          detalle: "costo venta FV" + venta.id,
          debito: total_costoventa,
          usuario_id: 1,
        },
        {
          cuentacontable_id: config.cuentas.inventario,
          detalle: "consumo inv FV" + venta.id,
          credito: total_costoventa,
          usuario_id: 1,
        },
      ];
      //movimiento
      const movimiento_contable = {
        efectivo: [
          //entrada de efectivo
          {
            cuentacontable_id: config.cuentas.efectivo,
            detalle: "Venta efectivo FV" + venta.id,
            debito: venta.total + (venta.impuesto || 0),
            usuario_id: 1,
          },
          ...mov_venta,
        ],
        credito: [
          ...mov_venta,
          //Pasivo proveeedor
          {
            cuentacontable_id: config.cuentas.cliente,
            detalle: "Cuenta por cobrar Cliente " + venta.proveedor_id,
            debito: venta.total + venta.impuesto,
            usuario_id: 1,
          },
        ],
      };

      await Movimiento.bulkCreate(movimiento_contable[body.tipo], {
        transaction: t,
      });

      return venta;
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create venta" });
  }
});

//Edit Venta
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const venta = await Venta.findByPk(id);

    if (!venta) {
      return res.status(404).json({
        msg: "No existe una venta con el id " + id,
      });
    }

    await venta.update(body);
    res.json(venta);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit venta" });
  }
});

//Delete secure Venta
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await Venta.findByPk(id);

    if (!venta) {
      return res.status(404).json({
        msg: "No existe una venta con el id " + id,
      });
    }

    await venta.destroy();
    res.json({ msg: "Delete secure venta as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Venta" });
  }
});

//Delete hard Venta
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const venta = await Venta.findByPk(id);

    if (!venta) {
      return res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }

    await venta.destroy({ force: true });
    res.json({ msg: "Venta completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard venta as sucefuly" });
  }
});

export default router;
