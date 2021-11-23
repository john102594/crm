import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, TextField } from "@material-ui/core";

import CenterFocusStrongRoundedIcon from "@material-ui/icons/CenterFocusStrongRounded";
import AddRoundedIcon from "@material-ui/icons/AddRounded";
import RemoveRoundedIcon from "@material-ui/icons/RemoveRounded";
import DragHandleRoundedIcon from "@material-ui/icons/DragHandleRounded";
import ModalVenta from "../Ventas/ModalVenta";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
    minWidth: "100%",
    height: "50px",
    minHeight: "50px",
    padding: "0",
  },
  btn3: {
    width: "100%",
    minWidth: "10px",
    height: "50px",
    minHeight: "50px",
    padding: "0",
  },
  btn2: {
    width: "100%",
    minWidth: "10px",
    height: "108px",
    minHeight: "108px",
    padding: "0",
  },
  contenedor: {
    margin: "0",
  },
  textfield: { 
    width: "100%", 
    minWidth: "100%",
    
  },
}));

const Teclado = (props) => {
  
  const classes = useStyles();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [open,setOpen] = React.useState(false);

  const onclickNumber = (number) => {
    props.setTextField(props.textField.concat(number.toString()));
  };
  //State de los inputs
  const handleChange = (e) => {
    props.setTextField(e.target.value);
  };
  //Accions
  const clean = () => {
    props.setTextField("");
  }; 

  const handleKeyPress = (event) => {
    let key = event.key;
    switch (key) {
      case "+":
        onclickAdd();
        event.preventDefault();
        break;
      case "-":
        onclickSub();
        event.preventDefault();
        break;
      case "*":
        event.preventDefault();
        break;
      case "Enter":
        onclickEqual();
        event.preventDefault();
        break;
      default:
        break;
    }
  }

  const onclickAdd = () => {
    props.onClickAdd();
    clean();
    document.querySelector("#textfield").focus();
  }
  const onclickSub = () => {
    clean();
    props.onClickSub();
    document.querySelector("#textfield").focus();
  };

  const onclickEqual = () => {
    if (props.disabledIgual) {
      clean();
      document.querySelector("#textfield").focus();
      setOpen(true);
    }
  };

  return (
    <Grid container spacing={0} alignItems="center">
      <ModalVenta open={open} setOpen={setOpen} />
      <Grid
        container
        direction="row"
        spacing={1}
        item
        alignItems="center"
        xs={12}
        className={classes.contenedor}
      >
        <Grid item xs={9}>
          <TextField
            className={classes.textfield}
            label="Codigó"
            id="textfield"
            variant="outlined"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={props.textField}
            autoFocus
            autoComplete="off"
          />
        </Grid>
        <Grid item xs={3}>
          <Button
            className={classes.btn}
            variant="outlined"
            color="primary"
            size="large"
          >
            <CenterFocusStrongRoundedIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        spacing={1}
        item
        xs={9}
        className={classes.contenedor}
      >
        <Grid item xs={8}>
          <Button
            className={classes.btn3}
            variant="outlined"
            color="secondary"
            size="large"
            onClick={clean}
          >
            CE
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.btn} variant="outlined" size="large">
            *
          </Button>
        </Grid>
        {numbers.map((number) => (
          <Grid item xs={4} key={number}>
            <Button
              className={classes.btn}
              variant="outlined"
              size="large"
              onClick={() => onclickNumber(number)}
            >
              {number}
            </Button>
          </Grid>
        ))}
        <Grid item xs={8}>
          <Button
            className={classes.btn}
            variant="outlined"
            size="large"
            onClick={() => onclickNumber(0)}
          >
            0
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button className={classes.btn} variant="outlined" size="large">
            .
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        spacing={1}
        item
        xs={3}
        className={classes.contenedor}
      >
        <Grid item xs>
          <Button
            className={classes.btn}
            variant="outlined"
            color="secondary"
            size="large"
            onClick={onclickSub}
          >
            <RemoveRoundedIcon />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.btn2}
            variant="outlined"
            color="primary"
            size="large"
            onClick={onclickAdd}
          >
            <AddRoundedIcon />
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            className={classes.btn2}
            variant="outlined"
            color="primary"
            size="large"
            onClick={onclickEqual}
            disabled={!props.disabledIgual}
          >
            <DragHandleRoundedIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Teclado;
