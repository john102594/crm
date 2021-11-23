import { Router } from "express";
import Usuario from "../models/usuario";
import Movimiento from "../models/contabilidad/movimiento";

const router = Router();

//Get user with all movimientos
router.get("/movimientos/cuenta", async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    include: {
      model: Movimiento,
      as: "movimientos",
      attributes: [
        "id",
        "idcuenta",
        "detalle",
        "credito",
        "debito",
        "updatedAt",
      ],
    },
  });
  res.json(usuarios);
});

//Get all
router.get("/", async (req, res) => {
  const usuarios = await Usuario.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });
  res.json(usuarios);
});

//Get one Usuario for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (usuario) {
    res.json(usuario);
    console.log(usuario);
  } else {
    res.status(404).json({ msg: `No existe una Usuario con el id ${id}` });
  }
});

//Get one user with all movimientos
router.get("/movimientos/cuenta/:id", async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findAll({
    where: { id: id },
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
    include: {
      model: Movimiento,
      as: "movimientos",
      attributes: [
        "id",
        "idcuenta",
        "detalle",
        "credito",
        "debito",
        "updatedAt",
      ],
    },
  });

  if (usuario) {
    res.json(usuario);
    console.log(usuario);
  } else {
    res.status(404).json({ msg: `No existe una Usuario con el id ${id}` });
  }
});

//Create one Usuario
router.post("/", async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    const usuario = new Usuario(body);
    await usuario.save();
    res.json(usuario);
    console.log(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create Usuario" });
  }
});

//Edit Usuario
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: "No existe una Usuarioa con el id " + id,
      });
    }

    await usuario.update(body);
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit Usuario" });
  }
});

//Delete secure Usuario
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({
        msg: "No existe una Usuario con el id " + id,
      });
    }

    await usuario.destroy();
    res.json({ msg: "Delete secure Usuario as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Usuario" });
  }
});

//Delete hard Usuario
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Usuario = await Usuario.findByPk(id);

    if (!Usuario) {
      return res.status(404).json({
        msg: "No existe un Usuario con el id " + id,
      });
    }

    await Usuario.destroy({ force: true });
    res.json({ msg: "Usuario completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard Usuario as sucefuly" });
  }
});

export default router;
