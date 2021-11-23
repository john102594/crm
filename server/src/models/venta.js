import db from "../db/connection";
import { DataTypes } from "sequelize";

const Venta = db.define(
  "venta",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    tipo_comprobante: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: "venta",
    },
    impuesto: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: true,
      defaultValue: 0.0,
    },
    total: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
  },
  {
    tableName: "ventas",
    paranoid: true,
  }
);

export default Venta;
