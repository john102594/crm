import db from "../../db/connection";
import { DataTypes } from "sequelize";

const Movimiento = db.define(
  "Contabilidad_movimiento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    detalle: {
      type: DataTypes.STRING,
    },
    debito: {
      type: DataTypes.DECIMAL(11, 2),
    },
    credito: {
      type: DataTypes.DECIMAL(11, 2),
    },
  },
  {
    paranoid: true,
  }
);

export default Movimiento;
