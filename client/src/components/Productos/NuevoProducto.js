import { Button, TextField } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  setProduct,
  saveProductAccion,
  // editProductAccion,
} from "../../redux/productsDucks";

const NuevoProducto = () => {
  const editar = false;
  const producto = useSelector((store) => store.productos.productoActual);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(setProduct({ ...producto, [e.target.name]: e.target.value }));
  };

  const saveProduct = (e) => {
    e.preventDefault();
    if (editar) {
      //   dispatch(editProductAccion());
    } else {
      dispatch(saveProductAccion());
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={saveProduct}
    >
      <TextField
        fullWidth
        required
        name="codigo"
        label="Codigo"
        onChange={handleChange}
        value={producto.codigo || ""}
        className={classes.textField}
      />
      <TextField
        fullWidth
        name="nombre"
        label="Nombre"
        onChange={handleChange}
        value={producto.nombre || ""}
        className={classes.textField}
      />
      <Button
        variant="contained"
        color="primary"
        className="ml-auto"
        type="submit"
      >
        Guardar
      </Button>
    </form>
  );
};

//Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    margin: theme.spacing(3),
    marginTop: theme.spacing(0),
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
}));

export default NuevoProducto;
