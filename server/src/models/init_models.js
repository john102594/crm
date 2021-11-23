import Movimiento from "./contabilidad/movimiento";
import Persona from "./persona";
import Cuenta_contable from "./contabilidad/cuenta_contable";
import Cuenta_type from "./contabilidad/cuenta_type";
import Detalle_ingreso from "./detalle_ingreso";
import Ingreso from "./ingreso";
import Detalle_venta from "./Detalle_venta";
import Venta from "./venta";
import Inventario_kardex from "./inventario_kardex";
import Producto from "./producto";
import Usuario from "./usuario";

//Relacion 1 a N se añade una columna usuarioId a la tabla movimientos
Usuario.hasMany(Movimiento, {
  as: "movimientos",
  foreignKey: { name: "usuario_id", allowNull: false },
});
Movimiento.belongsTo(Usuario, {
  foreignKey: { name: "usuario_id", allowNull: false },
});

//Movimiento cuenta contable
Cuenta_contable.hasMany(Movimiento, {
  as: "movimientos",
  foreignKey: { name: "cuentacontable_id", allowNull: false },
});
Movimiento.belongsTo(Cuenta_contable, {
  foreignKey: { name: "cuentacontable_id", allowNull: false },
});

//Kardex
Producto.hasMany(Inventario_kardex, {
  foreignKey: { name: "producto_id", allowNull: false },
});
Inventario_kardex.belongsTo(Producto, {
  foreignKey: { name: "producto_id", allowNull: false },
});

//Cuenta contable
Cuenta_type.hasMany(Cuenta_contable, {
  foreignKey: { name: "accounttype_id", allowNull: false },
});
Cuenta_contable.belongsTo(Cuenta_type, {
  foreignKey: { name: "accounttype_id", allowNull: false },
});

//Detalle ingreso
Ingreso.hasMany(Detalle_ingreso, {
  as: "detalle_ingreso",
  foreignKey: { name: "ingreso_id", allowNull: false },
});
Detalle_ingreso.belongsTo(Ingreso, {
  foreignKey: { name: "ingreso_id", allowNull: false },
});

//Relacion 1 a N se añade la columna idproveedor a la tabla ingrso
Persona.hasMany(Ingreso, {
  foreignKey: "proveedor_id",
});
Ingreso.belongsTo(Persona, {
  foreignKey: "proveedor_id",
});

//Relacion 1 a N se añade la columna id_producto a la tabla detalle_ingreso
Producto.hasMany(Detalle_ingreso, {
  foreignKey: { name: "producto_id", allowNull: false },
});
Detalle_ingreso.belongsTo(Producto, {
  foreignKey: { name: "producto_id", allowNull: false },
});

//Relacion 1 a N se añade la columna id_producto a la tabla detalle_venta
Producto.hasMany(Detalle_venta, {
  foreignKey: { name: "producto_id", allowNull: false },
});
Detalle_venta.belongsTo(Producto, {
  foreignKey: { name: "producto_id", allowNull: false },
});

//Ventas
Persona.hasMany(Venta, {
  foreignKey: "cliente_id",
});
Venta.belongsTo(Persona, {
  foreignKey: "cliente_id",
});

//Detalle Venta
Venta.hasMany(Detalle_venta, {
  foreignKey: { name: "venta_id", allowNull: false },
  onDelete: "CASCADE",
});
Detalle_venta.belongsTo(Venta, {
  foreignKey: { name: "venta_id", allowNull: false },
  onDelete: "CASCADE",
});

// ingreso.sync();
Cuenta_contable.hasOne(Persona, {
  foreignKey: { as: "CuentaCliente", name: "cuentacliente_id", unique: true },
});
Cuenta_contable.hasOne(Persona, {
  foreignKey: {
    as: "CuentaProveedor",
    name: "cuentaproveedor_id",
    unique: true,
  },
});
Cuenta_contable.belongsTo(Persona, {
  foreignKey: { as: "CuentaCliente", name: "cuentacliente_id", unique: true },
});
Persona.belongsTo(Cuenta_contable, {
  foreignKey: {
    as: "CuentaProveedor",
    name: "cuentaproveedor_id",
    unique: true,
  },
});

// Detalle_ingreso.sync({  true });
// Ingreso.sync({ alter: true });
