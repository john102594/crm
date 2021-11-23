import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Grid, Typography } from "@material-ui/core";
import Textfield from "../FormsUI/TextField";
import Select from "../FormsUI/Select";
import DateTimePicker from "../FormsUI/DataTimePicker";
import Checkbox from "../FormsUI/Checkbox";
import Button from "../FormsUI/Button";

//Initial State
const INITIAL_FORM_STATE = {
  nombre: "",
  email: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  fecha: "",
  terminos: false,
};

//Validaciones
const FORM_VALIDATION = Yup.object().shape({
  nombre: Yup.string().min(4, "Minimo 4 caracteres.").required("Requerido"),
  email: Yup.string().email("Email Invalido").required("Requerido"),
  telefono: Yup.number()
    .integer()
    .typeError("Por favor ingrese un numero valido"),
  ciudad: Yup.string().required("Requerido"),
  fecha: Yup.date().required("Requerido"),
  terminos: Yup.boolean()
    .oneOf([true], "Los terminos y condiciones deben ser aceptados.")
    .required("Los terminos y condiciones deben ser aceptados."),
});

const NewPerson = () => {
  return (
    <Formik
      initialValues={{
        ...INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={(values, actions) => {
        console.log(values);
        // actions.resetForm();
      }}
    >
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Detalles</Typography>
          </Grid>
          <Grid item xs={12}>
            <Textfield name="nombre" label="Nombre" />
          </Grid>
          <Grid item xs={12}>
            <Textfield name="email" label="Correo" />
          </Grid>

          <Grid item xs={12}>
            <Textfield name="direccion" label="Dirección" />
          </Grid>

          <Grid item xs={12}>
            <Typography>Informacion</Typography>
          </Grid>

          <Grid item xs={12}>
            <Select
              name="ciudad"
              label="Ciudad"
              options={{
                BQ: "Barranquilla",
                BG: "Bogota",
                CL: "Cali",
                MD: "Medellin",
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <DateTimePicker name="fecha" label="Fecha" />
          </Grid>

          <Grid item xs={12}>
            <Checkbox
              name="terminos"
              legend="Terminos y condiciones"
              label="Aceptar terminos y condiciones"
            />
          </Grid>

          <Grid item xs={12}>
            <Button>Guardar</Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default NewPerson;
