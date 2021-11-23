import React, { useEffect, useState, useRef } from "react";
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
import { getLastVenta, saveVenta } from "../../redux/ventasDucks";

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

const Ventas = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const productos = useSelector((store) => store.productos.productos);
  const ventas = useSelector((store) => store.ventas);
  const initialState = {
    tipo_comprobante: "venta",
    impuesto: 0,
    total: 0,
    codigo: "",
    id_producto: 0,
    nombre_producto: "",
    cantidad: 0,
    stock: 0,
    precio_und: 0,
  };

  const [validate, setValidate] = useState({ codigo: false, cantidad: false });
  const [venta, setVenta] = useState(initialState);
  let textInput = useRef(null);

  const validateErrors = () => {
    for (const key in validate) {
      if (validate[key]) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    dispatch(getProductAccion());
    dispatch(getLastVenta());
  }, [dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    const validationIsTrue = !validateErrors();

    if (validationIsTrue) {
      dispatch(saveVenta(venta)).then(
        () => {
          setVenta(initialState);
          dispatch(getLastVenta());
          dispatch(getProductAccion());
        },
        (err) => console.log(err)
      );
      textInput.current.focus();
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "cantidad") {
      let total = Number(e.target.value) * venta.precio_und;
      if (e.target.value > venta.stock) {
        setValidate({ ...validate, cantidad: true });
      } else {
        setValidate({ ...validate, cantidad: false });
      }
      setVenta({
        ...venta,
        [e.target.name]: e.target.value,
        total: total,
      });
    } else if (e.target.name === "precio_und") {
      let total = Number(e.target.value) * venta.cantidad;
      setVenta({
        ...venta,
        [e.target.name]: e.target.value,
        total: total,
      });
    } else {
      setVenta({ ...venta, [e.target.name]: e.target.value });
    }
  };

  const handleBlur = (e) => {
    if (e.target.name === "codigo") {
      let producto = productos.find(
        (element) => element.codigo === venta.codigo
      );
      if (producto) {
        setVenta({
          ...venta,
          id_producto: producto.id,
          stock: producto.saldo,
        });
        setValidate({ ...validate, codigo: false });
      } else {
        setValidate({ ...validate, codigo: true });
      }
    } else if (e.target.name === "id_producto") {
      let producto = productos.find(
        (element) => element.id === venta.id_producto
      );
      if (producto) {
        setVenta({
          ...venta,
          codigo: producto.codigo,
        });
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
              Factura de venta
            </Typography>

            <Typography
              gutterBottom
              variant="h6"
              component="h5"
              color="textSecondary"
            >
              Ref. {ventas.lastventa + 1 || ""}
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
                value={venta.codigo || ""}
                className={classes.textField}
                inputRef={textInput}
                autoFocus
                error={validate.codigo}
                helperText={
                  validate.codigo &&
                  "El codigo ingresado no corresponde a ningun producto."
                }
              />
              <FormControl className={classes.textField}>
                <InputLabel id="demo-simple-select-label">Producto</InputLabel>
                <Select
                  name="id_producto"
                  value={venta.id_producto || ""}
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
                  Inventario
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="py-1 m-0"
                  gutterBottom
                >
                  <NumberFormat
                    value={venta.stock || 0}
                    thousandSeparator
                    displayType={"text"}
                  />
                </Typography>
              </div>

              <TextField
                fullWidth
                required
                name="cantidad"
                label="Cantidad"
                onChange={handleChange}
                value={venta.cantidad || ""}
                className={classes.textField}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                error={validate.cantidad}
                helperText={
                  validate.cantidad &&
                  "No puede vender una mayor cantidad que el inventario."
                }
              />
              <TextField
                fullWidth
                required
                name="precio_und"
                label="Precio Und"
                onChange={handleChange}
                value={venta.precio_und || ""}
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
                value={venta.costo_total || 0}
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
                    value={venta.total || 0}
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

export default Ventas;
