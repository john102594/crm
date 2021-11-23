import React, { useEffect, useState } from "react";
import {
  getProductAccion,
  deleteOneProduct,
  setEditar,
  // setProduct,
} from "../../redux/productsDucks";
import { useDispatch, useSelector } from "react-redux";
import TablaGenerica from "../Component/TablaGenerica";
import {
  Button,
  Dialog,
  IconButton,
  Snackbar,
  Typography,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import NuevoProducto from "./NuevoProducto";
import MuiAlert from "@material-ui/lab/Alert";
import { format } from "../../Scripts/Scripts";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Productlist = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.productos.productos);
  const message = useSelector((store) => store.productos.message);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const columns = [
    {
      Header: "Codigo",
      accessor: "codigo", // accessor is the "key" in the data
    },
    {
      Header: "Nombre",
      accessor: "nombre", // accessor is the "key" in the data
    },
    {
      Header: "Stock",
      accessor: "saldo", // accessor is the "key" in the data
    },
    {
      Header: "Costo Prom",
      accessor: "costo_promund",
      Cell: (props) => format(props.value),
    },
    {
      Header: "Costo Total",
      accessor: "costo_total",
      Cell: (props) => format(props.value),
    },
    {
      Header: "Acción",
      accessor: "id",
      Filter: false,

      disableGroupBy: true,
      Cell: ({ cell: { value } }) => {
        return (
          <div className="d-flex flex-row ">
            <IconButton
              aria-label="edit"
              color="primary"
              onClick={() => editProduct(value)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={() => handleDelete(value)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getProductAccion());
  }, [dispatch]);

  useEffect(() => {
    setOpenSnack(true);
  }, [message]);

  const editProduct = (id) => {
    console.log(id);
    dispatch(setEditar(true, id));
    // dispatch(setProduct(data[id - 1]));
    setOpen(true);
  };

  const addProduct = () => {
    dispatch(setEditar(false));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteOneProduct(id));
  };
  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  //Titulo del dialog con boton de cerrar
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        <IconButton
          color="primary"
          className={classes.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </MuiDialogTitle>
    );
  });

  const btnNuevo = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        className="ml-auto"
        startIcon={<i className="fa fa-plus mr-1"></i>}
        onClick={addProduct}
      >
        Agregar Producto
      </Button>
    );
  };

  const Holdon = (columns, data) => {
    if (data) {
      return (
        <TablaGenerica
          columns={columns}
          nameFilter={"nombre"}
          data={data}
          disableGroupBy={true}
          disableFilters={true}
          enabledPagination={false}
          btnprops={btnNuevo()}
        />
      );
    }
  };

  return (
    <div className="card card-body">
      {Holdon(columns, data)}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>Nuevo Producto</DialogTitle>
        <NuevoProducto />
      </Dialog>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnack}
        onClose={handleCloseSnack}
      >
        {message && <Alert severity={message.type}>{message.text}</Alert>}
      </Snackbar>
    </div>
  );
};

export default Productlist;
