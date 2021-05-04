const { PRODUCT } = require('../../application/helpers/entities-names');
const { ensureEntityExist, getSafeDeleteParams } = require('../helpers');

module.exports = function buildDeleteProduct({ databaseService, dateUtils }) {
  const { productRepository } = databaseService;

  async function execute({ productId, account } = {}) {
    await ensureEntityExist(PRODUCT, productRepository, { id: productId });

    return productRepository.safeDeleteOne(productId, getSafeDeleteParams(dateUtils, account));
  }

  return { execute };
};
