import db from "../db/connection";
import { DataTypes } from "sequelize";

const Ingresos = db.define(
  "ingresos",
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
      defaultValue: "compra",
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
    tableName: "ingresos",
    paranoid: true,
  }
);

export default Ingresos;
