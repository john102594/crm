//Establecer la conexion con la base de datos
import Sequelize from "sequelize";
import config from "./config";

const db = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port,
  define: {
    underscored: true,
    timestamps: true,
  },
  dialectOptions: { decimalNumbers: true },
  // logging: false,
});

export default db;
