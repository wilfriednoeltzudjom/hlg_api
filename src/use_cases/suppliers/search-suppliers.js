const { setAnalyticsOnEachSupplier } = require('../helpers/supplier');
const { ensureSearchDataAreValid } = require('../helpers');

module.exports = function buildSearchSuppliers({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ data = {} } = {}) {
    ensureSearchDataAreValid(data);
    const suppliers = await supplierRepository.search(data);

    return setAnalyticsOnEachSupplier(databaseService, suppliers);
  }

  return { execute };
};
