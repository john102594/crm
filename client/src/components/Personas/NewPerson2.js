import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  // IconButton,
  Divider,
} from "@material-ui/core";
// import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import TableMaterialUI from "../Component/TableMaterialUI";
//Usando Store
import { addCuenta } from "../../redux/personDucks";
import { useDispatch, useSelector } from "react-redux";

//Estilos
const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 345,
  },
  textField: {
    marginBottom: "0.8rem",
  },
  form: {
    padding: "16px",
    width: "100%",
  },
  select: {
    minWidth: "90px",
  },
  section1: {
    margin: theme.spacing(0, 0, 3, 0),
  },
  section2: {
    margin: theme.spacing(2, 0),
  },
}));

//Elemento funcional
const NewPerson = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  //Estado Inicial
  const initialState = {
    nombre: "",
    tipo_documento: "",
    num_documento: "",
    telefono: "",
    direccion: "",
  };
  //Estado
  const [persona, setPersona] = useState(initialState);
  //Metodos
  const handleChange = (e) => {
    setPersona({ ...persona, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    console.log("saliste" + e.target.name);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  // const handleAddCuenta = (e) => {
  //   let cuentas = persona.cuentas.push({ num_cuenta: "", doc_cuenta: "" });
  //   setPersona({ ...persona, [cuentas]: cuentas });
  // };

  const handleAddCuenta = (data) => {
    dispatch(addCuenta(data));
  };

  //Visual
  return (
    <Paper variant="outlined" className={classes.paper}>
      <form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
        <div className={classes.section1}>
          <Typography variant="h6" gutterBottom color="textSecondary">
            Cliente/Proveedor
          </Typography>
          <TextField
            fullWidth
            required
            name="nombre"
            label="Nombre"
            onChange={handleChange}
            onBlur={handleBlur}
            value={persona.nombre || ""}
            className={classes.textField}
          />
          <Grid container direction="row" justify="space-between">
            <FormControl required className={classes.select}>
              <InputLabel>Tipo de doc.</InputLabel>
              <Select
                name="tipo_documento"
                value={persona.tipo_documento || "CC"}
                onChange={handleChange}
              >
                <MenuItem value={"CC"}>{"CC"}</MenuItem>
                <MenuItem value={"TI"}>{"TI"}</MenuItem>
                <MenuItem value={"PASS"}>{"PASS"}</MenuItem>
                <MenuItem value={"CDEX"}>{"CDEX"}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              required
              name="num_documento"
              label="Número de documento"
              onChange={handleChange}
              style={{ minWidth: "300px" }}
              value={persona.num_documento || ""}
              className={classes.textField}
            />
          </Grid>
          <TextField
            fullWidth
            name="telefono"
            label="Telefono"
            onChange={handleChange}
            value={persona.telefono || ""}
            className={classes.textField}
          />

          <TextField
            fullWidth
            name="direccion"
            label="Dirección"
            onChange={handleChange}
            value={persona.direccion || ""}
            className={classes.textField}
          />
        </div>

        <Divider variant="middle" />
        <div className={classes.section2}>
          <Typography variant="h6" gutterBottom color="textSecondary">
            Cuentas
          </Typography>

          <TableMaterialUI
            columns={[
              { title: "Numero de cuenta", field: "num_cuenta" },
              { title: "CC Cuenta", field: "doc_cuenta" },
            ]}
            onRowAdd={handleAddCuenta}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          className="mt-3"
          type="submit"
        >
          Guardar
        </Button>
      </form>
    </Paper>
  );
};

export default NewPerson;
