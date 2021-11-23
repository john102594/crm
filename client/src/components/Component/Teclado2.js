import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import ModalVenta from "../Ventas/ModalVenta";
import BackspaceIcon from "@material-ui/icons/Backspace";

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
    const valor = parseFloat(
      props.textField.toString().concat(number.toString())
    );
    props.setTextField(valor);
  };
  
  //Accions
  const clean = () => {
    props.clean();
  };  


  return (
    <Grid container spacing={0} alignItems="center">
      <ModalVenta open={open} setOpen={setOpen} />
      <Grid
        container
        direction="row"
        spacing={1}
        item
        xs={12}
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
          <Button
            className={classes.btn}
            variant="outlined"
            size="large"
            onClick={props.handleBackspace}
          >
            <BackspaceIcon />
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
    </Grid>
  );
};

export default Teclado;
