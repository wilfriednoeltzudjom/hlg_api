const { Product } = require('../../database/entities');
const { PRODUCT } = require('../../application/helpers/entities-names');
const { ensureEntityExist, ensureEntityDoesNotExist } = require('../helpers');
const { ensureRelatedEntitiesAreValid } = require('../helpers/product');

module.exports = function buildUpdateProduct({ databaseService }) {
  const { productRepository, ...restService } = databaseService;

  async function execute({ productId, ...productData } = {}) {
    const product = Product.fromJSON(productData);
    await ensureEntityExist(PRODUCT, productRepository, { id: productId });
    await ensureEntityDoesNotExist(PRODUCT, productRepository, { name: product.name, brand: product.brand, id: { $ne: productId } });
    await ensureRelatedEntitiesAreValid(restService, product);

    return productRepository.updateOne(productId, product);
  }

  return { execute };
};
