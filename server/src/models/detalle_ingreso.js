import db from "../db/connection";
import { DataTypes } from "sequelize";

const Detalle_ingreso = db.define(
  "detalle_ingreso",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    cantidad: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    costo_total: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
  },
  {
    tableName: "detalle_ingresos",
    paranoid: true,
    timestamps: false,
  }
);

export default Detalle_ingreso;
