const { ResourceNotFoundError } = require('../../application/helpers/errors');

async function findSupplier(supplierRepository, params = {}, options = {}) {
  const supplier = await supplierRepository.findOne(params, options);
  if (!supplier) {
    const searchingKeyName = Object.keys(params)[0];
    const searchingKeyValue = params[searchingKeyName];
    throw new ResourceNotFoundError(`Supplier with ${searchingKeyName} <${searchingKeyValue}> was not found`);
  }

  return supplier;
}

async function setAnalyticsOnEachSupplier(databaseService, suppliers) {
  const { productRepository } = databaseService;

  return Promise.all(
    suppliers.map(async function (supplier) {
      supplier.productsCount = await productRepository.count({ supplierId: supplier.id });

      return supplier;
    })
  );
}

module.exports = { findSupplier, setAnalyticsOnEachSupplier };
