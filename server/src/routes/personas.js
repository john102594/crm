import { Router } from "express";
import Person from "../models/persona";
import Cuenta_contable from "../models/contabilidad/cuenta_contable";
import db from "../db/connection";

const router = Router();

//Get all persons
router.get("/", async (req, res) => {
  const persons = await Person.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt", "deletedAt"],
    },
  });
  res.json(persons);
});

//Get one person for id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const person = await Person.findByPk(id);

  if (person) {
    res.json(person);
    console.log(person);
  } else {
    res.status(404).json({ msg: `No existe una persona con el id ${id}` });
  }
});

//Create one person
router.post("/", async (req, res) => {
  const { body } = req;
  console.log(body);

  try {
    //Validate
    const existePerson = await Person.findOne({
      where: {
        num_documento: body.num_documento,
      },
    });
    if (existePerson) {
      return res.status(400).json({
        msg:
          "Ya hay un usuario creado con el numero de documento " +
          body.num_documento,
      });
    }

    const result = await db.transaction(async (t) => {
      const person = await Person.create(body, {
        transaction: t,
      });
      return person;
    });

    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error create person: ", error });
  }
});

//Edit Person
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({
        msg: "No existe una persona con el id " + id,
      });
    }

    await person.update(body);
    res.json(person);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error edit person: " });
  }
});

//Delete secure Person
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({
        msg: "No existe una persona con el id " + id,
      });
    }

    await person.destroy();
    res.json({ msg: "Delete secure person as sucefuly" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error delete Person" });
  }
});

//Delete hard Person
router.delete("/force/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({
        msg: "No existe un usuario con el id " + id,
      });
    }

    await person.destroy({ force: true });
    res.json({ msg: "Person completamente borrada de manera exitosa" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Delete hard person as sucefuly" });
  }
});

export default router;
