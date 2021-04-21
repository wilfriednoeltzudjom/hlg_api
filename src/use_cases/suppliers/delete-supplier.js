const { getSafeDeleteParams, ensureEntityExist } = require('../helpers');

module.exports = function buildDeleteSupplier({ databaseService, dateUtils }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, account }) {
    await ensureEntityExist('Supplier', supplierRepository, { id: supplierId });

    return supplierRepository.safeDeleteOne(supplierId, getSafeDeleteParams(dateUtils, account));
  }

  return { execute };
};
