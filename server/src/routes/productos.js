import { Router } from "express";
import Producto from "../models/producto";
import Kardex from "../models/inventario_kardex";
import Sequelize, { Op } from "sequelize";
const router = Router();

// //Get all productos
// router.get("/", async (req, res) => {
//   const productos = await Producto.findAll({
//     attributes: {
//       exclude: ["createdAt", "updatedAt", "deletedAt"],
//     },
//   });
//   res.json({
//     rows: productos,
//     message: "Productos cargados satisfactoriamente.",
//   });
// });

//Get all productos with inventory
router.get("/", async (req, res) => {
  const idfilters = await Kardex.findAll({
    attributes: [[Sequelize.fn("max", Sequelize.col("id")), "id"]],
    group: "producto_id",
  });
  const idfilterarray = await idfilters.map((element) => element.id);

  const productos = await Producto.findAll({
    order: ["id"],
    attributes: [
      "id",
      "codigo",
      "nombre",
      "active",
      [Sequelize.col("kd.saldo"), "saldo"],
      [Sequelize.col("kd.costo_promund"), "costo_promund"],
      [Sequelize.literal("saldo * costo_promund"), "costo_total"],
    ],
    row: true,
    include: [
      {
        model: Kardex,
        as: "kd",
        attributes: [],
        required: false,
        where: {
          id: idfilterarray,
        },
      },
    ],
  });

  res.json({
    rows: productos,
    message: "Productos cargados satisfactoriamente.",
  });
});

//Get one producto for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const producto = await Producto.findByPk(id);

  if (producto) {
    res.json({ rows: producto });
    console.log(producto);
  } else {
    res
      .status(404)
      .json({ message: `No existe una productoa con el id ${id}` });
  }
});

//Create one producto
router.post("/", async (req, res) => {
  const { body } = req;

  try {
    //Validate
    const existeProducto = await Producto.findOne({
      where: {
        codigo: body.codigo,
      },
    });
    if (existeProducto) {
      return res.status(400).json({
        message: "Ya existe un producto creado con el codigo " + body.codigo,
      });
    }

    const producto = new Producto(body);
    await producto.save();
    res.json({ rows: producto });
    console.log(producto);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error create producto" });
  }
});

//Edit Producto
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "No existe una productoa con el id " + id,
      });
    }

    await producto.update(body);
    res.json({ rows: producto });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error edit producto" });
  }
});

//Delete secure Producto
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "No existe una productoa con el id " + id,
      });
    }

    await producto.destroy();
    res.json({ message: "Delete secure producto as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error delete Producto" });
  }
});

//Delete hard Producto
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({
        message: "No existe un usuario con el id " + id,
      });
    }

    await producto.destroy({ force: true });
    res.json({ message: "Producto completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Delete hard producto as sucefuly" });
  }
});

export default router;
