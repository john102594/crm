import React, { useState } from "react";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import {
  useTable,
  useFilters,
  useSortBy,
  useGroupBy,
  useExpanded,
  usePagination,
} from "react-table";
import {
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
  FcNext,
  FcPrevious,
} from "react-icons/fc";

const TablaGenerica = ({
  columns,
  data,
  updateMyData,
  skipPageReset,
  disableFilters = false,
  disableGroupBy = false,
  enabledExport = true,
  enabledFilter = true,
  enabledPagination = true,
  nameFilter = "name",
  btnprops,
}) => {
  const [filterInput, setFilterInput] = useState("");

  function getExportFileName({ fileType, all }) {
    return "archivo";
  }

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    // const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={"Buscar"}
        className="form-control mt-2"
      />
    );
  }

  const defaultColumn = {
    Filter: DefaultColumnFilter,
  };

  function getExportFileBlob({ columns, data, fileType, fileName }) {
    if (fileType === "csv") {
      // CSV example
      const headerNames = columns
        .filter((c) => c.Header !== "Action")
        .map((col) => col.exportValue);
      const csvString = Papa.unparse({ fields: headerNames, data });
      return new Blob([csvString], { type: "text/csv" });
    } else if (fileType === "xlsx") {
      // XLSX example
      const header = columns
        .filter((c) => c.Header !== "Action")
        .map((c) => c.exportValue);
      const compatibleData = data.map((row) => {
        const obj = {};
        header.forEach((col, index) => {
          obj[col] = row[index];
        });
        return obj;
      });

      let wb = XLSX.utils.book_new();
      let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
        header,
      });
      XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
      XLSX.writeFile(wb, `${fileName}.xlsx`);
      // Returning false as downloading of file is already taken care of
      return false;
    }
    //PDF example
    if (fileType === "pdf") {
      const headerNames = columns
        .filter((c) => c.Header !== "Action")
        .map((column) => column.exportValue);
      const doc = new JsPDF();
      doc.autoTable({
        head: [headerNames],
        body: data,
        styles: {
          minCellHeight: 9,
          halign: "left",
          valign: "center",
          fontSize: 11,
        },
      });
      doc.save(`${fileName}.pdf`);
      return false;
    }
    // Other formats goes here
    return false;
  }

  const TableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
      updateMyData,
      skipPageReset,
      getExportFileBlob,
      getExportFileName,
      disableFilters,
      disableGroupBy,
    },
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useExportData
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setFilter,
    page,
    exportData,
    // Paginación
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = TableInstance;

  const handleFilterChange = (e) => {
    const value = e.target.value || "";
    setFilter(nameFilter, value);
    setFilterInput(value);
  };

  return (
    <div>
      {/* Botones de exportar */}
      {enabledExport && (
        <div className="d-flex flex-row mb-3">
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-file-export"></i> Exportar
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className="dropdown-item"
                onClick={() => {
                  exportData("csv", true);
                }}
              >
                <i className="fa fa-file-csv mr-1 text-primary"></i>Exportar a
                CSV
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  exportData("xlsx", true);
                }}
              >
                <i className="fa fa-file-excel mr-1 text-success"></i>
                Exportar a Excel
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  exportData("pdf", true);
                }}
              >
                <i className="fa fa-file-pdf mr-1 text-danger"></i>Exportar a
                PDF
              </button>
            </div>
          </div>
          {btnprops}
        </div>
      )}
      {/* Input de filtrar por nombre */}
      {enabledFilter && (
        <div className="form-group input-group">
          <input
            className="form-control"
            value={filterInput}
            onChange={handleFilterChange}
            placeholder={"Buscar por nombre"}
          />
        </div>
      )}

      {/* Tabla */}
      <table
        {...getTableProps()}
        className="table table-bordered table-condensed table-responsive table-striped"
        style={{ display: "table" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            // Aplicar los accesorios de la fila del encabezado
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Recorrer los encabezados de cada fila
                headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    className="text-center align-text-top"
                  >
                    {column.canGroupBy ? (
                      // If the column can be grouped, let's add a toggle
                      <span {...column.getGroupByToggleProps()}>
                        {column.isGrouped ? <FcNext /> : <FcPrevious />}
                      </span>
                    ) : null}

                    <span {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <FcAlphabeticalSortingZa size={"1.3rem"} />
                        ) : (
                          <FcAlphabeticalSortingAz size={"1.3rem"} />
                        )
                      ) : (
                        ""
                      )}
                    </span>

                    {column.canFilter ? column.render("Filter") : null}
                  </th>
                ))
              }
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.isGrouped ? (
                        // If it's a grouped cell, add an expander and row count
                        <>
                          <span {...row.getToggleRowExpandedProps()}>
                            {row.isExpanded ? "👇" : "👉"}
                          </span>{" "}
                          {cell.render("Cell")} ({row.subRows.length})
                        </>
                      ) : cell.isAggregated ? (
                        // If the cell is aggregated, use the Aggregated
                        // renderer for cell
                        cell.render("Aggregated")
                      ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                        // Otherwise, just render the regular cell
                        cell.render("Cell")
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {enabledPagination && (
        <form className="inline">
          <div className="form-row">
            <div className="form-group input-group col-md-2">
              <ul className="pagination">
                <li
                  className={
                    !canPreviousPage ? "page-item disabled" : "page-item "
                  }
                >
                  <button
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(0);
                    }}
                  >
                    {"<<"}
                  </button>
                </li>
                <li
                  className={
                    !canPreviousPage ? "page-item disabled" : "page-item "
                  }
                >
                  <button
                    className="page-link "
                    onClick={(e) => {
                      e.preventDefault();
                      previousPage();
                    }}
                  >
                    {"<"}
                  </button>
                </li>
                <li
                  className={!canNextPage ? "page-item disabled" : "page-item "}
                >
                  <button
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      nextPage();
                    }}
                  >
                    {">"}
                  </button>
                </li>
                <li
                  className={!canNextPage ? "page-item disabled" : "page-item "}
                >
                  <button
                    className="page-link"
                    onClick={(e) => {
                      e.preventDefault();
                      gotoPage(pageCount - 1);
                    }}
                  >
                    {">>"}
                  </button>
                </li>
              </ul>
            </div>
            <div className="form-group input-group col-md-2">
              <input
                className="form-control"
                type="number"
                value={pageIndex + 1}
                onChange={(e) => {
                  if (
                    (Number(e.target.value) > 0) &
                    (Number(e.target.value) < pageCount + 1)
                  ) {
                    gotoPage(Number(e.target.value - 1));
                  }
                }}
                style={{ width: "100px" }}
              />
            </div>
            <div className="form-group input-group col-md-2">
              <select
                className="custom-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Ver {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <span>
              Pagina{" "}
              <strong>
                {pageIndex + 1} de {pageOptions.length}
              </strong>{" "}
            </span>
          </div>
        </form>
      )}
    </div>
  );
};

export default TablaGenerica;
