"use strict";
const cuentas = require("./contabilidad_cuentas.json");
const tipo_cuenta = require("./contabilidad_tipocuenta.json");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "contabilidad_cuenta_types",
      tipo_cuenta,
      {}
    );
    await queryInterface.bulkInsert("contabilidad_cuentas", cuentas, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contabilidad_cuentas", null, {});
    await queryInterface.bulkDelete("contabilidad_cuenta_types", null, {});
  },
};
