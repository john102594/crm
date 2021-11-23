import React from "react";
import TablaGenerica from "../Component/TablaGenerica";
import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { format } from "../../Scripts/Scripts";

const ComprasList = () => {
  const data = [
    { id: 1, fc: 1, total: 150000 },
    { id: 2, fc: 2, total: 1250000 },
  ];
  const columns = [
    {
      Header: "#Factura",
      accessor: "fc", // accessor is the "key" in the data
    },
    {
      Header: "Total",
      accessor: "total",
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
  const editProduct = (id) => {
    console.log(id);
    // dispatch(setEditar(true, id));
    // // dispatch(setProduct(data[id - 1]));
    // setOpen(true);
  };
  const handleDelete = (id) => {
    // dispatch(deleteOneProduct(id));
  };
  return (
    <div>
      <TablaGenerica
        columns={columns}
        nameFilter={"id"}
        data={data}
        disableGroupBy={true}
        disableFilters={true}
        enabledPagination={false}
      />
    </div>
  );
};

export default ComprasList;
