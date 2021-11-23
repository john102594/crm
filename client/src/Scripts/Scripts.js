export const format = (number) => {
  let numero = number.toLocaleString("es-CO", {});
  return numero;
};

/**
 * Funcion para ordenar arreglos por un campo expecifico
 * @param {array} a nombre del metodo
 * @param {array} b mensaje a mostrar
 * @param {String} campo indique el campo de ordenacion
 * @param {number} order indique 1 para ascendente y -1 para desendente
 * @returns {array} el codigo de retorno 0
 */
export const orderByNumber = (a, b, campo, order) => {
  return (a[campo] - b[campo]) * order;
};
