const { Supplier, Address } = require('../../database/entities');

module.exports = function buildSupplier({ dataGeneration, databaseService }) {
  const { supplierRepository } = databaseService;

  function generate(initValues = {}) {
    return Object.assign(dataGeneration.generateSupplier(), initValues);
  }

  async function create(initValues = {}) {
    const { officeAddress, ...supplierData } = generate(initValues);

    return supplierRepository.create(Supplier.newInstance({ ...supplierData, officeAddress: Address.newInstance(officeAddress) }));
  }

  return { generate, create };
};
