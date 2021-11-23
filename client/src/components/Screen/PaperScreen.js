import React from "react";
import { Route, withRouter, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

//Componentes propios
import Ventas from "../Ventas/Ventas";
import ImportarProductos from "../Maestros/ImportarProductos";
import Productlist from "../Productos/Productlist";
import Formtienda from "../Configuracion/FormTienda";
import Compra from "../Compras/Compra";
import NewPerson from "../Personas/NewPerson";
import ComprasList from "../Compras/ComprasList";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
  },
  link: {
    display: "flex",
    textTransform: "capitalize",
    alignItems: "center",
    fontSize: "0.9rem",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  breadcrumbs: {
    borderBottom: theme.palette.properties.border,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(0.5),
  },
}));

const PaperScreen = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Switch>
        <Route path="/productos" component={Productlist} />
        <Route path="/ventas" component={Ventas} />
        <Route path="/importar productos" component={ImportarProductos} />
        <Route path="/nueva compra" component={Compra} />
        <Route path="/compras" component={ComprasList} />
        <Route path="/tienda" component={Formtienda} />
        <Route path="/nueva persona" component={NewPerson} />
      </Switch>
    </div>
  );
};

export default withRouter(PaperScreen);
