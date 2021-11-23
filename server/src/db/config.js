require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "admin",
  password: process.env.DB_PASSWORD || "admin",
  database: process.env.DB_DATABASE || "cajadb",
  dialect: process.env.DB_DIALECT || "mysql",
  port: process.env.DB_PORT || "3308",
};
