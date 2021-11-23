import db from "../db/connection";
import { DataTypes } from "sequelize";

const Inventario_kardex = db.define(
  "inventario_kardex",
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
    },
    cantidad: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
    valor_und: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
    saldo: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
    costo_promund: {
      type: DataTypes.DECIMAL(11, 2),
      allowNull: true,
    },
  },
  {
    tableName: "inventario_kardex",
    paranoid: true,
  }
);

export default Inventario_kardex;
