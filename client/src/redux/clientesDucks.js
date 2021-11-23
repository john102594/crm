import axios from "axios";
const config = require("../config/config");

// Constantes, Estado
const dataInicial = {
  clientes: [],
  clienteActual: [],
  editar: false,
  message: [],
};

// Tipos

const OBTENER_CLIENTES = "OBTENER_CLIENTES";
const OBTENER_UN_CLIENTE = "OBTENER_UN_CLIENTE";
const GUARDAR_CLIENTE = "GUARDAR_CLIENTE";
const ELIMINAR_CLIENTE = "ELIMINAR_CLIENTE";
const EDITAR = "EDITAR";
const SET_STATE = "SET_STATE";

// Reducer
export default function clientesReducer(state = dataInicial, action) {
  switch (action.type) {
    case OBTENER_CLIENTES:
      return {
        ...state,
        clientes: action.payload,
        clienteActual: [],
        editar: false,
        message: [],
      };
    case OBTENER_UN_CLIENTE:
      return {
        ...state,
        clienteActual: action.payload,
        editar: action.editar,
        message: [],
      };
    case SET_STATE:
      return {
        ...state,
        clienteActual: action.cliente,
        editar: action.editar,
      };
    case GUARDAR_CLIENTE:
      return { ...state, message: action.payload, editar: false };
    case ELIMINAR_CLIENTE:
      return { ...state, message: action.payload };
    case EDITAR:
      return { ...state, editar: action.editar };
    default:
      return state;
  }
}

// Acciones esto consume la API envia los datos al estado o contantes
export const getClientes = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "/clientes");
    const data = [];
    res.data.map((dato) =>
      data.push({ name: dato.clientename, imgsrc: dato.imgsrc })
    );
    dispatch({
      type: OBTENER_CLIENTES,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneCliente = (_id) => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "/categories/" + _id);
    if (res.data) {
      dispatch({
        type: OBTENER_CLIENTES,
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

export const setCliente = (cliente, editar) => async (dispatch, getState) => {
  dispatch({
    type: SET_STATE,
    cliente,
    editar: editar,
  });
};

export const saveCliente = () => async (dispatch, getState) => {
  try {
    const cliente = getState().clienteActual;
    const data = new FormData();
    Object.keys(cliente).forEach((key) => {
      data.append(key, cliente[key]);
    });
    const res = await axios.post(config.API + "/clientes", data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    dispatch({
      type: GUARDAR_CLIENTE,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editCliente = () => async (dispatch, getState) => {
  try {
    const cliente = getState().categories.clienteActual;
    const data = new FormData();
    Object.keys(cliente).forEach((key) => {
      data.append(key, cliente[key]);
    });
    const res = await axios.put(
      config.API + "/categories/" + cliente._id,
      data
    );
    dispatch({
      type: GUARDAR_CLIENTE,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCliente = (_id) => async (dispatch, getState) => {
  try {
    // console.log(_id);
    const res = await axios.delete(config.API + "/categories/" + _id);
    dispatch({
      type: ELIMINAR_CLIENTE,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};
