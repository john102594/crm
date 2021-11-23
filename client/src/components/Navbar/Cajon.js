import React from "react";

// Componentes
import {
  makeStyles,
  Drawer,
  Divider,
  ListItem,
  Typography,
  IconButton,
} from "@material-ui/core";
import Listas from "./Listas";

// Iconos
import MenuIcon from "@material-ui/icons/Menu";

const drawerWidth = 240; //Ancho del drawer

// Estilos
const estilos = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth, //CSS ancho del drawer
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.properties.background,
    "&::-webkit-scrollbar": {
      width: "4px",
      heigth: "200px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#00bcd4",
      borderRadius: "2px",
    },
    /* Cambiamos el fondo y agregamos una sombra cuando esté en hover */
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#03a9f4",
      boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.2)",
    },
    /* Cambiamos el fondo cuando esté en active */
    "&::-webkit-scrollbar-thumb:active": {
      backgroundColor: "#03a9f4",
    },
    // /* Ponemos un color de fondo y redondeamos las esquinas del track */
    // "&::-webkit-scrollbar-track" :{
    //     background: "#e1e1e1",
    //     borderRadius: "2px"
    // },
    // /* Cambiamos el fondo cuando esté en active o hover */
    // "&::-webkit-scrollbar-track:hover,&::-webkit-scrollbar-track:active" :{
    //   background: "#d4d4d4"
    // }
  },
  toolbar: theme.mixins.toolbar,
  title: {
    color: theme.palette.properties.active,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: theme.palette.properties.active,
  },
}));

// Componente
const Cajon = (props) => {
  const classes = estilos();

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left" //Ubicacion del drawer
      variant={props.variant}
      open={props.open}
      onClose={props.onClose ? props.onClose : null}
    >
      <ListItem children className={classes.toolbar}>
        <IconButton
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={props.onClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          AGATA
        </Typography>
      </ListItem>

      <Divider />
      <Listas />
    </Drawer>
  );
};

export default Cajon;
