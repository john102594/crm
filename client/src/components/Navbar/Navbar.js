import React from "react";

// Componentes
import {
  makeStyles,
  IconButton,
  Button,
  Toolbar,
  Typography,
  AppBar,
} from "@material-ui/core";
import config from "../../config/config";
// Iconos
import MenuIcon from "@material-ui/icons/Menu";

// Estilos
const useStyle = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1, //Esto indica que el titulo ocupara todo el espacio disponible esto empuja a la derecha el resto del contenido
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.properties.background,
  },
}));

// Componente
export default function Navbar(props) {
  const classes = useStyle();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="menu"
          className={classes.menuButton}
          onClick={props.onClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          {config.AppName}
        </Typography>

        <Button variant="text" color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}
