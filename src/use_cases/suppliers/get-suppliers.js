const { setAnalyticsOnEachSupplier } = require('../helpers/supplier');

module.exports = function buildGetSuppliers({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ options = {} } = {}) {
    const { withAnalytics = true } = options;
    const suppliers = await supplierRepository.findMany();

    return withAnalytics ? setAnalyticsOnEachSupplier(databaseService, suppliers) : suppliers;
  }

  return { execute };
};
