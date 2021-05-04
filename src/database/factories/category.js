const { Category } = require('../../database/entities');

module.exports = function buildSupplier({ dataGeneration, databaseService }) {
  const { categoryRepository } = databaseService;

  function generate(initValues = {}) {
    return Object.assign(dataGeneration.generateCategory(), initValues);
  }

  async function create(initValues = {}) {
    const { parent, ...restProps } = generate(initValues);
    if (parent) restProps.parent = Category.fromJSON(parent);

    return categoryRepository.create(Category.newInstance(restProps));
  }

  return { generate, create };
};
