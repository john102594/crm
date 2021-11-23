import db from "../db/connection";
import { DataTypes } from "sequelize";

const Usuario = db.define(
  "Usuario",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    rol: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    tableName: "usuarios",
    paranoid: true,
  }
);

export default Usuario;
