import { Router } from "express";
import Movimiento from "../models/contabilidad/movimiento";
import Cuenta_contable from "../models/contabilidad/cuenta_contable";
import db from "../db/connection";

const router = Router();

//Get all
router.get("/", async (req, res) => {
  const movimientos = await Movimiento.findAll({
    include: {
      model: Cuenta_contable,
      attributes: ["account_number", "label"],
    },
  });
  res.json(movimientos);
});

//Get one movimiento for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const movimiento = await Movimiento.findByPk(id);

  if (movimiento) {
    res.json(movimiento);
    console.log(movimiento);
  } else {
    res.status(404).json({ msg: `No existe una movimientoa con el id ${id}` });
  }
});

//Create one movimiento
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const result = await db.transaction(async (t) => {
      return await Movimiento.bulkCreate(body, { transaction: t });
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create movimiento" });
  }
});

//Edit Movimiento
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({
        msg: "No existe una movimientoa con el id " + id,
      });
    }

    await movimiento.update(body);
    res.json(movimiento);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit movimiento" });
  }
});

//Delete secure Movimiento
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({
        msg: "No existe una movimiento con el id " + id,
      });
    }

    await movimiento.destroy();
    res.json({ msg: "Delete secure movimiento as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Movimiento" });
  }
});

//Delete hard Movimiento
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const movimiento = await Movimiento.findByPk(id);

    if (!movimiento) {
      return res.status(404).json({
        msg: "No existe un movimiento con el id " + id,
      });
    }

    await movimiento.destroy({ force: true });
    res.json({ msg: "Movimiento completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard movimiento as sucefuly" });
  }
});

export default router;
