const { Supplier } = require('../../database/entities');
const { ensureEntityExist } = require('../helpers');
const { SUPPLIER } = require('../../application/helpers/entities-names');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildUpdateSupplier({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, data = {} } = {}) {
    const supplier = Supplier.fromJSON(data);
    await ensureEntityExist(SUPPLIER, supplierRepository, { id: supplierId });
    await ensureSupplierDoesNotExist(supplierId, supplier);

    return supplierRepository.updateOne(supplierId, supplier);
  }

  async function ensureSupplierDoesNotExist(supplierId, supplier) {
    const matchingCount = await supplierRepository.count({
      $or: [{ email: supplier.email }, { phone: supplier.phone }],
      id: { $ne: supplierId },
    });
    if (matchingCount) throw new BadRequestError(`Supplier with email <${supplier.email}> or phone <${supplier.phone}> already exists`);
  }

  return { execute };
};
