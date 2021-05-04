const { Product, Category, Supplier } = require('../../database/entities');
const { ensureEntityDoesNotExist, generateEntityCode } = require('../helpers');
const { isValidJSONObject } = require('../../application/helpers/entity-utils');
const { PRODUCT } = require('../../application/helpers/entities-names');

module.exports = function buildCreateProduct({ databaseService }) {
  const { productRepository } = databaseService;

  async function execute({ name, brand, unitBuyingPrice, quantity, expirationDate, description, category = {}, supplier = {} } = {}) {
    const product = Product.newInstance({ name, brand, unitBuyingPrice, quantity, expirationDate, description });
    if (isValidJSONObject(category)) product.category = Category.fromJSON(category);
    if (isValidJSONObject(supplier)) product.supplier = Supplier.fromJSON(supplier);
    await ensureEntityDoesNotExist(PRODUCT, productRepository, { name: product.name, brand: product.brand });
    product.code = await generateEntityCode(PRODUCT, productRepository);

    return productRepository.create(product);
  }

  return { execute };
};
