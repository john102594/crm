import db from "../../db/connection";
import { DataTypes } from "sequelize";

const Cuenta_contable = db.define(
  "Contabilidad_cuenta",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    fk_pcg_version: {
      type: DataTypes.STRING(32),
      defaultValue: "PUC-COL",
    },
    pcg_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    pcg_subtype: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    account_number: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
    account_parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    label: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    accounttype_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 4,
      references: {
        model: "contabilidad_cuenta_types",
        key: "id",
      },
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
  },
  {
    tableName: "contabilidad_cuentas",
    timestamps: true,
    paranoid: true,
  }
);

export default Cuenta_contable;
