const { Product } = require('../../database/entities');
const { PRODUCT } = require('../../application/helpers/entities-names');
const { ensureEntityExist, ensureEntityDoesNotExist } = require('../helpers');
const { ensureRelatedEntitiesAreValid } = require('../helpers/product');

module.exports = function buildUpdateProduct({ databaseService }) {
  const { productRepository, ...restService } = databaseService;

  async function execute({ productId, data = {}, options = {} } = {}) {
    const product = Product.fromJSON(data);
    await ensureEntityExist(PRODUCT, productRepository, { id: productId });
    await ensureEntityDoesNotExist(PRODUCT, productRepository, { name: product.name, brand: product.brand, id: { $ne: productId } });
    await ensureRelatedEntitiesAreValid(restService, product, options);

    return productRepository.updateOne(productId, product, options);
  }

  return { execute };
};
