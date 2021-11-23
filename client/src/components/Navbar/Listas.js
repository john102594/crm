import React, { useState } from "react";
import { Link } from "react-router-dom";

//Componentes
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Collapse,
  makeStyles,
} from "@material-ui/core";

//Iconos

import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ExpandLess from "@material-ui/icons/ExpandLess";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// import CategoryIcon from "@material-ui/icons/Category";
import CardTravelIcon from "@material-ui/icons/CardTravel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShopIcon from "@material-ui/icons/Shop";
import PersonIcon from "@material-ui/icons/Person";

// Componente
const estilos = makeStyles((theme) => ({
  item: {
    color: theme.palette.properties.textcolor,
    "&:hover": {
      color: theme.palette.properties.active,
      backgroundColor: theme.palette.properties.hover,
    },
    "&.Mui-selected": {
      color: theme.palette.properties.active,
      backgroundColor: theme.palette.properties.hoverP,
      "&:hover": {
        backgroundColor: theme.palette.properties.hoverP,
      },
    },
  },
  icon: {
    marginRight: "12px",
    fontSize: "1.2",
  },

  nested: {
    paddingLeft: theme.spacing(6),
    color: theme.palette.properties.textcolor,
    "&:hover": {
      color: theme.palette.properties.active,
      backgroundColor: theme.palette.properties.hover,
    },
    "&.Mui-selected": {
      color: theme.palette.properties.active,
      backgroundColor: theme.palette.properties.hover,
    },
  },
}));

const Listas = () => {
  const classes = estilos();
  const [selectedIndexP, setSelectedIndexP] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const Menus = [
    {
      title: "Caja",
      icon: <LocalOfferIcon className={classes.icon} />,
      subtitle: [
        "Ventas",
        "Editar Ventas",
        "Movimientos de Caja",
        "Cerrar Caja",
      ],
    },

    {
      title: "Compras",
      icon: <ShopIcon className={classes.icon} />,
      subtitle: ["Nueva Compra", "Compras"],
    },
    {
      title: "Productos",
      icon: <CardTravelIcon className={classes.icon} />,
      subtitle: ["Productos", "Importar Productos"],
    },
    {
      title: "Clientes/Proveedores",
      icon: <SupervisorAccountIcon className={classes.icon} />,
      subtitle: ["Nueva Persona", "Clientes", "Proveedores"],
    },
    {
      title: "Configuracion",
      icon: <PersonIcon className={classes.icon} />,
      subtitle: ["Tienda"],
    },
  ];

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleListPClick = (event, index) => {
    if (index === selectedIndexP) {
      setSelectedIndexP(0);
    } else {
      setSelectedIndexP(index);
    }
  };

  return (
    <List component="nav">
      {Menus.map((item, key) => {
        return (
          <div key={item.title + key}>
            <ListItem
              button
              onClick={(event) => handleListPClick(event, key + 1)}
              className={classes.item}
              selected={selectedIndexP === key + 1}
            >
              {item.icon}
              <ListItemText primary={item.title} />
              {selectedIndexP === key + 1 ? (
                <ExpandLess />
              ) : (
                <NavigateNextIcon />
              )}
            </ListItem>
            <Collapse
              in={selectedIndexP === key + 1}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.subtitle.map((subitem, subkey) => {
                  const newkey = key.toString() + subkey;
                  return (
                    <ListItem
                      button
                      key={subitem + subkey}
                      component={Link}
                      to={"/" + subitem.toLowerCase()}
                      className={classes.nested}
                      selected={selectedIndex === newkey}
                      onClick={(event) => handleListItemClick(event, newkey)}
                    >
                      <ListItemText primary={subitem} />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

export default Listas;
