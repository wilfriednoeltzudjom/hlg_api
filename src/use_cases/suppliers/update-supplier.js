const supplierHelper = require('../helpers/supplier');

module.exports = function buildUpdateSupplier({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ supplierId, ...supplierUpdates }) {
    const supplier = await supplierHelper.findSupplier(supplierRepository, { id: supplierId });
    const { officeAddress = {}, ...restProps } = supplierUpdates;
    Object.assign(supplier, restProps);
    Object.assign(supplier.officeAddress, officeAddress);

    return supplierRepository.updateOne(supplier);
  }

  return { execute };
};
