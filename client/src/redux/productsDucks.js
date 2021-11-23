import axios from "axios";
const config = require("../config/config");

// Constantes, Estado
const dataInicial = {
  productos: [],
  productoActual: [],
  message: [],
  editar: false,
};

// Tipos

const OBTENER_PRODUCTOS = "OBTENER_PRODUCTOS";
const OBTENER_UNPRODUCTO = "OBTENER_UNPRODUCTO";
const AGREGAR_TITULAR = "AGREGAR_TITULAR";
const SET_STATE = "SET_STATE";
const GUARDAR_PRODUCTO = "GUARDAR_PRODUCTO";
const EDITAR = "EDITAR";
const ELIMINAR_PRODUCTO = "ELIMINAR_PRODUCTO";
const EDIT_MESSAGE = "EDIT_MESSAGE";
// Reducer
export default function productsReducer(state = dataInicial, action) {
  switch (action.type) {
    case EDIT_MESSAGE:
      return {
        ...state,
        message: action.message,
      };
    case OBTENER_PRODUCTOS:
      return {
        ...state,
        productos: action.payload,
        productoActual: [],
        message: action.message,
        editar: false,
      };
    case AGREGAR_TITULAR:
      return {
        ...state,
        productoActual: state.productoActual.concat(action.producto),
      };
    case OBTENER_UNPRODUCTO:
      return {
        ...state,
        productoActual: action.payload,
        editar: action.editar,
      };
    case ELIMINAR_PRODUCTO:
      return { ...state, message: action.payload };
    case SET_STATE:
      return {
        ...state,
        productoActual: action.producto,
      };
    case GUARDAR_PRODUCTO:
      return { ...state, message: action.payload };
    case EDITAR:
      return {
        ...state,
        productoActual: action.producto,
        editar: action.editar,
      };

    default:
      return state;
  }
}

// Acciones esto consume la API envia los datos al estado o contantes

//GET
export const getProductAccion = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(config.API + "products");
    dispatch({
      type: OBTENER_PRODUCTOS,
      payload: res.data.rows,
      message: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get one for code
// export const getOneProductAccion =
//   (code, editar = false) =>
//   async (dispatch, getState) => {
//     try {
//       const res = await axios.get(config.API + "products/", {
//         params: { codigo: code },
//       });
//       if (res.data) {
//         dispatch({
//           type: OBTENER_UNPRODUCTO,
//           payload: res.data,
//           editar: true,
//         });
//       } else {
//         dispatch({
//           type: EDITAR,
//           editar: false,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//Get one for id
// export const getOneProductIdAccion =
//   (_id, editar = false) =>
//   async (dispatch, getState) => {
//     try {
//       const res = await axios.get(config.API + "products/", {
//         params: { id: _id },
//       });
//       if (res.data) {
//         dispatch({
//           type: OBTENER_UNPRODUCTO,
//           payload: res.data,
//           editar: true,
//         });
//       } else {
//         dispatch({
//           type: EDITAR,
//           editar: false,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//Post save product
export const saveProductAccion = () => async (dispatch, getState) => {
  try {
    const product = JSON.stringify(getState().productos.productoActual);
    const res = await axios.post(config.API + "products", product, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    dispatch({
      type: GUARDAR_PRODUCTO,
      payload: res.data.message,
    });
    dispatch(getProductAccion());
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: EDIT_MESSAGE,
      message: { text: error.response.data.message, type: "error" },
    });
  }
};

//delete product
export const deleteOneProduct = (id) => async (dispatch, getState) => {
  try {
    const res = await axios.delete(config.API + "products/" + id);
    dispatch({
      type: ELIMINAR_PRODUCTO,
      payload: res.data.message,
    });
    dispatch(getProductAccion());
  } catch (error) {
    console.log(error);
  }
};

export const importProductAccion = (data) => async (dispatch, getState) => {
  try {
    const res = await axios.post(config.API + "products/import", data);
    dispatch({
      type: GUARDAR_PRODUCTO,
      payload: res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
};

export const editProductAccion =
  (productCategory) => async (dispatch, getState) => {
    try {
      const product = getState().productos.productoActual;
      product.categoryid = productCategory;
      const data = new FormData();
      Object.keys(product).forEach((key) => {
        data.append(key, product[key]);
      });
      const res = await axios.put(
        config.API + "products/one/" + product._id,
        data
      );
      dispatch({
        type: GUARDAR_PRODUCTO,
        payload: res.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const agregarTitular = (producto) => async (dispatch, getState) => {
  dispatch({
    type: AGREGAR_TITULAR,
    producto,
  });
};

export const setProduct = (producto) => async (dispatch, getState) => {
  dispatch({
    type: SET_STATE,
    producto,
  });
};

export const setEditar = (editar, id) => async (dispatch, getState) => {
  let producto = [];
  if (editar) {
    console.log(editar);
    producto = getState().productos.productos.find((product) => {
      return product.id === id;
    });
  }

  dispatch({
    type: EDITAR,
    editar: editar,
    producto,
  });
};
