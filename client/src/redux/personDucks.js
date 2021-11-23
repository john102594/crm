// import axios from "axios";
// const config = require("../config/config");

// Constantes, Estado
const dataInicial = {
  personas: [],
  cuentas: [],
  message: [],
};

// Tipos

const ADD_CUENTAS = "ADD_CUENTAS";
// const OBTENER_PERSONAS = "OBTENER_PERSONAS";

// Reducer
export default function personReducer(state = dataInicial, action) {
  switch (action.type) {
    case ADD_CUENTAS:
      return {
        ...state,
        cuentas: action.payload,
        message: [],
      };
    default:
      return state;
  }
}

// Acciones esto consume la API envia los datos al estado o contantes
export const getCuentas = () => async (dispatch, getState) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const addCuenta = (data) => async (dispatch, getState) => {
  try {
    console.log(data);
    dispatch({
      type: ADD_CUENTAS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
