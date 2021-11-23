import db from "../db/connection";
import { DataTypes } from "sequelize";

const Producto = db.define(
  "producto",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "codigo_UNIQUE",
    },
    nombre: {
      type: DataTypes.STRING(45),
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "productos",
    paranoid: true,
  }
);

export default Producto;
