require("dotenv").config();

module.exports = {
  host: process.env.DB_HOST || "localhost",
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "cajadb",
  dialect: process.env.DB_DIALECT || "mysql",
};
