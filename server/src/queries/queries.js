const queries = {
  compra: {
    select_lastid: "SELECT MAX(id) as id from ingreso;",
    select_id: "select * from ingreso WHERE id = ?",
    select_all: "select * from ingreso;",
    insert: `
        INSERT INTO ingreso (idproveedor, tipo_comprobante, impuesto, total, estado) VALUES (?,?,?,?,?);
    `,
    delete: "DELETE FROM ingreso WHERE id =?;",
    insert_detallecompra: `
        INSERT INTO detalle_ingreso ( id_ingreso, id_producto, cantidad, costo_total) VALUES ?;
    `,
    delete_detallecompra: "DELETE FROM detalle_ingreso WHERE id =?;",
  },
  venta: {
    insert: `
        INSERT INTO venta (idcliente, tipo_comprobante, impuesto, total, estado) VALUES (?,?,?,?,?);
    `,
    delete: "DELETE FROM venta WHERE id =?;",
    insert_detalleventa: `
        INSERT INTO detalle_venta ( id_venta, id_producto, cantidad, precio_total, costo_promedio) VALUES ?;
    `,
    select_id: "select * from venta WHERE id = ?;",
    select_all: "select * from venta;",
    select_lastid: "SELECT MAX(id) as id from venta;",
    delete_detallecompra: "DELETE FROM detalle_venta WHERE id =?;",
  },
  persona: {
    select_all: {},
  },
  producto: {
    select_lastid: "SELECT MAX(id) as id from persona;",
    select_id: "select * from persona WHERE id = ?;",
    select_all: "select * from persona;",
    insert: `
        INSERT INTO persona (id, nombre, tipo_documento, num_documento, telefono, direccion) VALUES (?,?,?,?,?,?);
    `,
  },
  kardex: {
    insert: `
        INSERT INTO kardex (id_producto, tipo_comprobante, cantidad, valor_und, saldo,costo_promund) VALUES (?,?,?,?,?,?);
    `,
    select_last_productoid: `
        SELECT * FROM kardex WHERE id_producto=? ORDER BY id DESC limit 1;
    `,
  },
  reportes: {
    valor_inventario: `
    SELECT P.id, P.codigo, P.nombre, K.saldo, K.costo_promund AS costo_promedio, K.saldo*K.costo_promund AS costo_total
    FROM producto P LEFT JOIN (
      SELECT * FROM kardex where id IN (
        select MAX(id)
        from kardex
        group by id_producto
        )) K 
      ON P.id=K.id_producto
    WHERE P.estado="active"
    `,
  },
};

export default queries;
