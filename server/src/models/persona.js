import db from "../db/connection";
import { DataTypes } from "sequelize";

const Persona = db.define(
  "Persona",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.STRING,
    },
    num_documento: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    cuentacliente_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    cuentaproveedor_id: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    paranoid: true,
    // indexes: [
    //   { unique: true, fields: ["cuentacliente_id", "cuentaproveedor_id"] },
    // ],
  }
);

export default Persona;
