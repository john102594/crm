import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  FormControl,
  InputLabel,
  Select,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { importProductAccion } from "../../redux/productsDucks";
import { AiFillFileExcel } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 300,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  input: {
    display:"none",
  },
  lbl:{
    margin: "0 0.3rem 0 1rem"
  }
}));

const ImportarProductos = () => {
  
  const classes = useStyles();
  const [titulos, setTitulos] = useState([]);
  const [archivo, setArchivo] = useState("Ningún archivo seleccionado");
  const [datos, setDatos] = useState([]);
  const [data, setData] = useState({
    codeid: { label: "Codigo", value: "" },
    name: { label: "Nombre", value: "" },
    description: { label: "Descripcion", value: "" },
    cost: { label: "Precio Compra", value: "" },
    price: { label: "Precio Venta", value: "" },
    descuento: { label: "Descuento", value: "" },
    impuesto: { label: "Iva", value: "" },
    imgsrc: { label: "Link Imagen", value: "" },
    categoryid: { label: "Categoria", value: "" },
    materialid: { label: "Material", value: "" },
    active: { label: "Activo", value: "" },
    cantidad: { label: "Inventario Inicial", value: "" },
  });
  const dispatch = useDispatch();

  const handleClick = () => {
    const codeidValue = data["codeid"].value;
    const nameValue = data["name"].value;
    const descriptionValue = data["description"].value;
    const costValue = data["cost"].value;
    const priceValue = data["price"].value;
    const descuentValue = data["descuento"].value;
    const impuestoValue = data["impuesto"].value;
    const imgsrcValue = data["imgsrc"].value;
    const categoryidValue = data["categoryid"].value;
    const materialidValue = data["materialid"].value;
    const activeValue = data["active"].value;
    const cantidadValue = data["cantidad"].value;

    let datosmap = [];
    datos.forEach((element) => {
      datosmap.push({
        codeid: element[codeidValue],
        name: element[nameValue],
        description: element[descriptionValue] || "",
        cost: element[costValue],
        price: element[priceValue],
        descuento: element[descuentValue] || 0,
        impuesto: element[impuestoValue] || 0,
        imgsrc: element[imgsrcValue] || "",
        categoryid: element[categoryidValue],
        materialid: element[materialidValue],
        active: element[activeValue] || false,
        cantidad: element[cantidadValue] || 0,
      });
    });
    dispatch(importProductAccion(datosmap));
    console.log(datosmap);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    setData({
      ...data,
      [name]: { ...data[name], value: event.target.value },
    });
  };

  const handleChangeInput = (event) => {
    const target = event.target;
    let hojas = [];
    if (target.files[0]) {
      setArchivo(target.files[0].name);
      let reader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onloadend = (e) => {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: "array" });
        workbook.SheetNames.forEach(function (sheetName) {
          var XL_row_object = XLSX.utils.sheet_to_row_object_array(
            workbook.Sheets[sheetName]
          );
          hojas.push({
            data: XL_row_object,
            sheetName,
          });
        });
        console.log(hojas);
        setDatos(hojas[0].data);
        setTitulos(Object.keys(hojas[0].data[0]));
      };
    }else{
      setArchivo("Ningún archivo seleccionado")
      setDatos([]);
      setTitulos([]);
    }
  };

  return (
    <div>
      <input
        required
        className={classes.input}
        name="file"
        id="file"
        onChange={handleChangeInput}
        type="file"
      />
      <label htmlFor="file" className={classes.lbl}>
        <Button
          variant="contained"
          color="primary"
          component="span"
          className={classes.button}
          startIcon={<AiFillFileExcel className={classes.icon} />}
        >
          Importar
        </Button>
      </label>
      <span>{archivo}</span>

      <Button
        variant="contained"
        color="primary"
        className={classes.lbl}
        onClick={handleClick}
      >
        Cargar
      </Button>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        {Object.keys(data).map((title) => (
          <FormControl
            variant="outlined"
            className={classes.formControl}
            key={data[title].label}
          >
            <InputLabel>{data[title].label}</InputLabel>
            <Select
              native
              value={data[title].value}
              onChange={handleChange}
              label={data[title].label}
              inputProps={{
                name: title,
                id: "age-native-simple",
              }}
            >
              <option aria-label="None" value="" />
              {titulos.map((titulo) => (
                <option value={titulo} key={titulo}>
                  {titulo}
                </option>
              ))}
            </Select>
          </FormControl>
        ))}
      </Grid>
    </div>
  );
};

export default ImportarProductos;