import axios from "axios";
const config = require("../config/config");

// Constantes, Estado
const dataInicial = {
  compras: [],
  lastcompra: 0,
  message: [],
};

// Tipos

const OBTENER_COMPRAS = "OBTENER_COMPRAS";
const OBTENER_COMPRAS_DETALLES = "OBTENER_COMPRAS_DETALLES";
const OBTENER_ULTIMACOMPRA = "OBTENER_ULTIMACOMPRA";
const OBTENER_UNA_COMPRA = "OBTENER_UNA_COMPRA";
const GUARDAR_COMPRA = "GUARDAR_COMPRA";
const ELIMINAR_COMPRA = "ELIMINAR_COMPRA";
const EDITAR = "EDITAR";
const SET_STATE = "SET_STATE";

// Reducer
export default function comprasReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_COMPRAS_DETALLES:
      return {
        ...state,
        compras: action.payload,
      };
    case OBTENER_ULTIMACOMPRA:
      return {
        ...state,
        lastcompra: action.payload,
      };
    case OBTENER_UNA_COMPRA:
      return {
        ...state,
        compraActual: action.payload,
        editar: action.editar,
        message: [],
      };
    case SET_STATE:
      return {
        ...state,
        compraActual: action.compra,
        editar: action.editar,
      };
    case GUARDAR_COMPRA:
      return { ...state, message: action.payload, editar: false };
    case ELIMINAR_COMPRA:
      return { ...state, message: action.payload };
    case EDITAR:
      return { ...state, editar: action.editar };
    default:
      return state;
  }
}

//Obtener id ultima compra
export const getLastCompra = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "compras/last");
    if (res.data) {
      dispatch({
        type: OBTENER_ULTIMACOMPRA,
        payload: res.data.id,
      });
    } else {
      dispatch({
        type: OBTENER_ULTIMACOMPRA,
        payload: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getDetalleCompras = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "compras/detalle");
    if (res.data) {
      dispatch({
        type: OBTENER_COMPRAS_DETALLES,
        payload: res.data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Guardar Compra
export const saveCompra = (compraactual) => async (dispatch, getState) => {
  try {
    let compra = {};
    compra.tipo_comprobante = compraactual.tipo_comprobante;
    compra.impuesto = compraactual.impuesto;
    compra.total = Number(compraactual.total);
    compra.tipo = "efectivo";
    compra.detalle_ingreso = [
      {
        producto_id: compraactual.id_producto,
        cantidad: Number(compraactual.cantidad),
        costo_total: Number(compraactual.total),
      },
    ];
    const res = await axios.post(config.API + "compras/", compra, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GUARDAR_COMPRA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneCompra = (_id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "/categories/" + _id);
    if (res.data) {
      dispatch({
        type: OBTENER_UNA_COMPRA,
        payload: res.data,
        editar: true,
      });
    } else {
      dispatch({
        type: EDITAR,
        editar: false,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setCompra = (compra, editar) => async (dispatch, getState) => {
  dispatch({
    type: SET_STATE,
    compra,
    editar: editar,
  });
};

export const editCompra = () => async (dispatch, getState) => {
  try {
    const compra = getState().categories.compraActual;
    const data = new FormData();
    Object.keys(compra).forEach((key) => {
      data.append(key, compra[key]);
    });
    const res = await axios.put(config.API + "/categories/" + compra._id, data);
    dispatch({
      type: GUARDAR_COMPRA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCompra = (_id) => async (dispatch, getState) => {
  try {
    // console.log(_id);
    const res = await axios.delete(config.API + "/categories/" + _id);
    dispatch({
      type: ELIMINAR_COMPRA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};
