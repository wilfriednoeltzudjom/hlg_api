const { getSafeDeleteParams } = require('../helpers');
const supplierHelper = require('../helpers/supplier');

module.exports = function buildDeleteSupplier({ databaseService, dateUtils }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, account }) {
    const supplier = await supplierHelper.findSupplier(supplierRepository, { id: supplierId });

    return supplierRepository.safeDeleteOne(supplier, getSafeDeleteParams(dateUtils, account));
  }

  return { execute };
};
