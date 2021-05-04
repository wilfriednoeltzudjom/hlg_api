const { SUPPLIER } = require('../../application/helpers/entities-names');
const { getSafeDeleteParams, ensureEntityExist } = require('../helpers');

module.exports = function buildDeleteSupplier({ databaseService, dateUtils }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, account } = {}) {
    await ensureEntityExist(SUPPLIER, supplierRepository, { id: supplierId });

    return supplierRepository.safeDeleteOne(supplierId, getSafeDeleteParams(dateUtils, account));
  }

  return { execute };
};
