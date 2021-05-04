const { Product, Category, Supplier } = require('../../database/entities');

module.exports = function buildSupplier({ dataGeneration, databaseService }) {
  const { productRepository } = databaseService;

  function generate(initValues = {}) {
    return Object.assign(dataGeneration.generateProduct(), initValues);
  }

  async function create(initValues = {}) {
    const { category, supplier, ...restProps } = generate(initValues);
    if (category) restProps.category = Category.fromJSON(category);
    if (supplier) restProps.supplier = Supplier.fromJSON(supplier);

    return productRepository.create(Product.newInstance(restProps));
  }

  return { generate, create };
};
