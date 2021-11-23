import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core/";
import styled from "styled-components";

export const Container = styled.div`
  .MuiTableRow-hover {
    &:hover {
      background-color: #bbdefb;
    }
  }
  .Mui-selected {
    background-color: #bbdefb;
  }
  .celda{
    background-color: #ffffff;
    font-size: 1.1rem;
  }
  .celdadatos{
    font-size: 1rem;
  }
  .container{
    max-height: 300px;
    padding: 0;
  }
  .root{
    width: 100%;
    padding: 0;
  }
`;

const Tabla = (props) => {
  const rows = props.data;
  const columns = props.columns;
  const isSelected = (key) => props.selected === key;

  const handleClick = (event, key) => {
    props.setSelected(key);
  };

  return (
    <Container>
      <Paper className="root" elevation={0}>
        <TableContainer className="container">
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="celda">
                  {"#"}
                </TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="celda"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row, key) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={key}
                    onClick={(event) => handleClick(event, key)}
                    aria-checked={isSelected(key)}
                    selected={isSelected(key)}
                  >
                    <TableCell align="center">{key + 1}</TableCell>

                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} className="celdadatos">
                          {column.format 
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default Tabla;
