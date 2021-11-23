import db from "../../db/connection";
import { DataTypes } from "sequelize";

const Cuenta_type = db.define(
  "contabilidad_cuenta_type",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    tableName: "contabilidad_cuenta_types",
    timestamps: false,
    paranoid: true,
  }
);

export default Cuenta_type;
