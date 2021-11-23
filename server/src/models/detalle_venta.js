import db from "../db/connection";
import { DataTypes } from "sequelize";

const Detalle_venta = db.define(
  "detalle_venta",
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
    precio_total: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: false,
    },
    costo_promedio: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
  },
  {
    tableName: "detalle_ventas",
    paranoid: true,
    timestamps: false,
  }
);

export default Detalle_venta;
