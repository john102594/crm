import Inventario_kardex from "../models/inventario_kardex";

const kardexController = {};

kardexController.getLastKardex = async (producto_id) => {
  const result = await Inventario_kardex.findOne({
    where: {
      producto_id: producto_id,
    },
    attributes: ["producto_id", "saldo", "costo_promund"],
    order: [["id", "DESC"]],
    limit: 1,
  });
  return result;
};

export default kardexController;
