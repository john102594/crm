import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px",
      width: "100%",
      height: "100vh",
    },
  },
  body: {
    backgroundColor: "#f5f5f5",
  },
}));

const Ventas = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper variant="outlined" />
    </div>
  );
};

export default Ventas;