import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "./config";
import db from "./db/connection";
require("../src/models/init_models");
//Rutas
import personRoutes from "./routes/personas";
import accountingMovementRoutes from "./routes/movimientos";
import userRoutes from "./routes/usuarios";
import productRoutes from "./routes/productos";
import comprasRoutes from "./routes/compras";
import ventasRoutes from "./routes/ventas";
import cuentasContablesRoutes from "./routes/cuentas_contable";

//GraphQL

//Inicializaciones
const app = express();
//Inicar DB
//Iniciar ORM de base de datos con sequelize
db.authenticate().then(() => {
  console.log("Database online");
});
// (async () => {
//   await db.sync({ alter: true });
//   // Code here
// })();
//Setting
app.set("port", config.api.port);

//Middleawares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", extended: true }));

//Global Variables

//Routes
app.use("/products", productRoutes);
app.use("/compras", comprasRoutes);
app.use("/ventas", ventasRoutes);
app.use("/person", personRoutes);
app.use("/user", userRoutes);
app.use("/accounting/movement", accountingMovementRoutes);
app.use("/accounting/cuentas", cuentasContablesRoutes);

export default app;
