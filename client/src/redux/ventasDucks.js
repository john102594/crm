import axios from "axios";
const config = require("../config/config");

// Constantes, Estado
const dataInicial = {
  ventas: [],
  lastventa: 0,
  message: [],
};

// Tipos

const OBTENER_VENTAS = "OBTENER_VENTAS";
const OBTENER_ULTIMAVENTA = "OBTENER_ULTIMAVENTA";
const OBTENER_UNA_VENTA = "OBTENER_UNA_VENTA";
const GUARDAR_VENTA = "GUARDAR_VENTA";
const ELIMINAR_VENTA = "ELIMINAR_VENTA";
const EDITAR = "EDITAR";
const SET_STATE = "SET_STATE";

// Reducer
export default function ventasReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_VENTAS:
      return {
        ...state,
        ventas: action.payload,
        ventaActual: [],
        editar: false,
        message: [],
      };
    case OBTENER_ULTIMAVENTA:
      return {
        ...state,
        lastventa: action.payload,
      };
    case OBTENER_UNA_VENTA:
      return {
        ...state,
        ventaActual: action.payload,
        editar: action.editar,
        message: [],
      };
    case SET_STATE:
      return {
        ...state,
        ventaActual: action.venta,
        editar: action.editar,
      };
    case GUARDAR_VENTA:
      return { ...state, message: action.payload, editar: false };
    case ELIMINAR_VENTA:
      return { ...state, message: action.payload };
    case EDITAR:
      return { ...state, editar: action.editar };
    default:
      return state;
  }
}

//Obtener id ultima venta
export const getLastVenta = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "ventas/last");
    console.log(res.data);

    if (res.data) {
      dispatch({
        type: OBTENER_ULTIMAVENTA,
        payload: res.data.id,
      });
    } else {
      dispatch({
        type: OBTENER_ULTIMAVENTA,
        payload: 0,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Guardar Venta
export const saveVenta = (ventaactual) => async (dispatch, getState) => {
  try {
    let venta = {};
    venta.tipo_comprobante = ventaactual.tipo_comprobante;
    venta.impuesto = ventaactual.impuesto;
    venta.total = Number(ventaactual.total);
    venta.tipo = "efectivo";
    venta.detalle_venta = [
      {
        producto_id: ventaactual.id_producto,
        cantidad: Number(ventaactual.cantidad),
        precio_total: Number(ventaactual.total),
      },
    ];
    const res = await axios.post(config.API + "ventas/", venta, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({
      type: GUARDAR_VENTA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneVenta = (_id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "/categories/" + _id);
    if (res.data) {
      dispatch({
        type: OBTENER_UNA_VENTA,
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

export const setVenta = (venta, editar) => async (dispatch, getState) => {
  dispatch({
    type: SET_STATE,
    venta,
    editar: editar,
  });
};

export const editVenta = () => async (dispatch, getState) => {
  try {
    const venta = getState().categories.ventaActual;
    const data = new FormData();
    Object.keys(venta).forEach((key) => {
      data.append(key, venta[key]);
    });
    const res = await axios.put(config.API + "/categories/" + venta._id, data);
    dispatch({
      type: GUARDAR_VENTA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteVenta = (_id) => async (dispatch, getState) => {
  try {
    // console.log(_id);
    const res = await axios.delete(config.API + "/categories/" + _id);
    dispatch({
      type: ELIMINAR_VENTA,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};
