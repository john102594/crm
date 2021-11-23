import { Router } from "express";
import Cuenta_contable from "../models/contabilidad/cuenta_contable";

const router = Router();

//Get all
router.get("/", async (req, res) => {
  const cuentas_contable = await Cuenta_contable.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });
  res.json(cuentas_contable);
});

//Get one cuenta_contable for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const cuenta_contable = await Cuenta_contable.findByPk(id);

  if (cuenta_contable) {
    res.json(cuenta_contable);
  } else {
    res
      .status(404)
      .json({ msg: `No existe una cuenta_contable con el id ${id}` });
  }
});

//Create one cuenta_contable
router.post("/", async (req, res) => {
  const { body } = req;
  try {
    const cuenta_contable = new Cuenta_contable(body);
    await cuenta_contable.save();
    res.json(cuenta_contable);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create cuenta_contable" });
  }
});

//Edit Cuenta_contable
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const cuenta_contable = await Cuenta_contable.findByPk(id);

    if (!cuenta_contable) {
      return res.status(404).json({
        msg: "No existe una cuenta_contablea con el id " + id,
      });
    }

    await cuenta_contable.update(body);
    res.json(cuenta_contable);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit cuenta_contable" });
  }
});

//Delete secure Cuenta_contable
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cuenta_contable = await Cuenta_contable.findByPk(id);

    if (!cuenta_contable) {
      return res.status(404).json({
        msg: "No existe una cuenta_contable con el id " + id,
      });
    }

    await cuenta_contable.destroy();
    res.json({ msg: "Delete secure cuenta_contable as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Cuenta_contable" });
  }
});

//Delete hard Cuenta_contable
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta_contable = await Cuenta_contable.findByPk(id);

    if (!cuenta_contable) {
      return res.status(404).json({
        msg: "No existe un cuenta_contable con el id " + id,
      });
    }

    await cuenta_contable.destroy({ force: true });
    res.json({
      msg: "Cuenta_contable completamente borrada de manera exitosa",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard cuenta_contable as sucefuly" });
  }
});

export default router;
