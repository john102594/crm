import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// El store une todos los ducks
import productsReducer from "./productsDucks";
import comprasReducer from "./comprasDucks";
import ventasReducer from "./ventasDucks";
import clientesReducer from "./clientesDucks";
import personReducer from "./personDucks";

// Funcion reductora
const rootReducer = combineReducers({
  productos: productsReducer,
  compra: comprasReducer,
  ventas: ventasReducer,
  clientes: clientesReducer,
  person: personReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
