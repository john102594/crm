import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getProductAccion } from "../../redux/productsDucks";
import { getLastCompra, saveCompra } from "../../redux/comprasDucks";
// import NewPerson from "../Personas/NewPerson";
const useStyles = makeStyles((theme) => ({
  factura: {
    minWidth: 345,
  },
  textField: {
    width: "100%",
    marginBottom: "0.8rem",
  },
  divtotal: {
    marginRight: "auto",
    minWidth: "100%",
    borderWidth: "0 0 2px 0",
    border: "solid #5DADE2",
  },
}));

const Compra = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productos = useSelector((store) => store.productos.productos);
  const compras = useSelector((store) => store.compra);
  const initialState = {
    tipo_comprobante: "compra",
    impuesto: 0,
    total: 0,
    codigo: "",
    id_producto: 0,
    nombre_producto: "",
    cantidad: 0,
    precio_und: 0,
  };
  const [compra, setCompra] = useState(initialState);

  useEffect(() => {
    dispatch(getProductAccion());
    dispatch(getLastCompra());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(saveCompra(compra)).then(
      () => {
        setCompra(initialState);
        dispatch(getLastCompra());
      },
      (err) => console.log(err)
    );
  };

  const handleChange = (e) => {
    if (e.target.name === "cantidad") {
      let total = Number(e.target.value) * compra.precio_und;
      setCompra({
        ...compra,
        [e.target.name]: e.target.value,
        total: total,
      });
    } else if (e.target.name === "precio_und") {
      let total = Number(e.target.value) * compra.cantidad;
      setCompra({
        ...compra,
        [e.target.name]: e.target.value,
        total: total,
      });
    } else {
      setCompra({ ...compra, [e.target.name]: e.target.value });
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === "codigo") {
      let producto = productos.find(
        (element) => element.codigo === compra.codigo
      );
      if (producto) {
        setCompra({ ...compra, id_producto: producto.id });
      }
    } else if (e.target.name === "id_producto") {
      let producto = productos.find(
        (element) => element.id === compra.id_producto
      );
      if (producto) {
        setCompra({ ...compra, codigo: producto.codigo });
      }
    }
  };

  return (
    <Grid container direction="row" justify="space-evenly">
      <Paper className={classes.factura} variant="outlined">
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Typography
              gutterBottom
              variant="h6"
              component="h5"
              color="textSecondary"
            >
              Factura de compra
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              component="h5"
              color="textSecondary"
            >
              Ref. {compras.lastcompra + 1 || ""}
            </Typography>
          </Grid>

          <form autoComplete="off" onSubmit={onSubmit}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <TextField
                fullWidth
                required
                name="codigo"
                label="Codigo Producto"
                onChange={handleChange}
                onBlur={handleBlur}
                value={compra.codigo || ""}
                className={classes.textField}
                autoFocus
              />
              <FormControl className={classes.textField}>
                <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                <Select
                  name="id_producto"
                  value={compra.id_producto || ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {productos.map((element) => {
                    return (
                      <MenuItem key={element.codigo} value={element.id}>
                        {element.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <div className={classes.divtotal}>
                <Typography variant="caption" gutterBottom className="m-0 p-0">
                  Proveedor
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="py-1 m-0"
                  gutterBottom
                >
                  John Rodriguez
                </Typography>
              </div>

              <TextField
                fullWidth
                required
                name="cantidad"
                label="Cantidad"
                onChange={handleChange}
                value={compra.cantidad || ""}
                className={classes.textField}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              <TextField
                fullWidth
                required
                name="precio_und"
                label="Precio Und"
                onChange={handleChange}
                value={compra.precio_und || ""}
                className={classes.textField}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
              />
              {/* <TextField
                fullWidth
                name="costo_total"
                label="Total"
                onChange={handleChange}
                onBlur={handleBlur}
                value={compra.costo_total || 0}
                className={classes.textField}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                  readOnly: true,
                }}
              /> */}

              <div className={classes.divtotal}>
                <Typography variant="caption" gutterBottom className="m-0 p-0">
                  Total
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="py-1 m-0"
                  gutterBottom
                >
                  <NumberFormat
                    value={compra.total || 0}
                    thousandSeparator
                    displayType={"text"}
                  />
                </Typography>
              </div>

              <Button
                variant="contained"
                color="primary"
                className="mt-3"
                type="submit"
              >
                Guardar
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Paper>

      {/* <NewPerson /> */}
    </Grid>
  );
};

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Compra;
