const { SUPPLIER } = require('../../application/helpers/entities-names');
const { BadRequestError } = require('../../application/helpers/errors');
const { getSafeDeleteParams, ensureEntityExist } = require('../helpers');

module.exports = function buildDeleteSupplier({ databaseService, dateUtils }) {
  const { supplierRepository, productRepository } = databaseService;

  async function execute({ supplierId, account } = {}) {
    await ensureEntityExist(SUPPLIER, supplierRepository, { id: supplierId });
    await ensureSupplierIsDeletable(supplierId);

    return supplierRepository.safeDeleteOne(supplierId, getSafeDeleteParams(dateUtils, account));
  }

  async function ensureSupplierIsDeletable(supplierId) {
    const matchingProducts = await productRepository.count({ supplierId });
    if (matchingProducts > 0) throw new BadRequestError(`This supplier is already associated to ${matchingProducts} product(s) and thus can not be deleted`);
  }

  return { execute };
};
