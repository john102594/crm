const config = {
  api: { port: process.env.PORT || 4000 },
  cuentas: {
    efectivo: 1,
    inventario: 281,
    ivacompra: 816,
    retefuentecompra: 784,
    retefuenteventa: 213,
    ivaventa: 816,
    cuentaventa: 1260,
    costoventa: 2200,
    proveedor: 740,
    cliente: 148,
  },
  db: {
    host: "localhost",
    user: "admin",
    password: "admin",
    database: "cajadb",
    dialect: "mysql",
  },
};
export default config;
