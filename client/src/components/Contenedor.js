import React from "react";
import { makeStyles, Hidden } from "@material-ui/core";
import Navbar from "./Navbar/Navbar";
import Cajon from "./Navbar/Cajon";
import clsx from "clsx";

import PaperScreen from "./Screen/PaperScreen";

const drawerWidth = 240; //Ancho del drawer

const estilos = makeStyles((theme) => ({

  root: {
    display: "flex",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },
  paper: {
      margin: "2px",
      width: "100%",
      minHeight: "100vh",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(1.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("sm")]: {
      marginLeft: -drawerWidth,
    },
  },

  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    margin: theme.spacing(0),
  },
}));

const Contenedor = () => {
  
  //Variables y state
  const classes = estilos();
  const [abrir, setAbrir] = React.useState(false);

  //Accions
  const openDrawer = () => {
    setAbrir(!abrir);
  };

  return (
    <div className={classes.root}>
      <Navbar onClick={openDrawer} open={abrir} />
      {/* Mostrar Drawer en pantallas mayores a xs */}
      <Hidden xsDown>
        <Cajon variant="persistent" open={abrir} onClick={openDrawer} />
      </Hidden>

      {/* Mostrar Drawer en pantalla xs al presionar boton */}
      <Hidden smUp>
        <Cajon
          variant="temporary"
          open={abrir}
          onClose={openDrawer}
          onClick={openDrawer}
        />
      </Hidden>

      <main
        className={clsx(classes.content, { [classes.contentShift]: abrir })}
      >
        <div className={classes.drawerHeader}></div>
        <PaperScreen className={classes.paper} variant="outlined"/>
      </main>
    </div>
  );
};

export default Contenedor;
