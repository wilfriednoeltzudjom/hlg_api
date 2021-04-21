const { Supplier } = require('../../database/entities');
const { ensureEntityExist } = require('../helpers');

module.exports = function buildUpdateSupplier({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, ...supplierData }) {
    const supplier = Supplier.fromJSON(supplierData);
    await ensureEntityExist('Supplier', supplierRepository, { id: supplierId });

    return supplierRepository.updateOne(supplierId, supplier);
  }

  return { execute };
};
