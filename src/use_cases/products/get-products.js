const { CATEGORY } = require('../../application/helpers/entities-names');
const { isValidValue } = require('../../application/helpers/entity-utils');
const { ensureEntityExist } = require('../helpers');

module.exports = function buildGetProducts({ databaseService }) {
  const { productRepository, categoryRepository } = databaseService;

  async function execute({ categoryId } = {}) {
    const filters = {};
    await setCategoryFilter(categoryId, filters);

    return productRepository.findMany(filters);
  }

  async function setCategoryFilter(categoryId, filters) {
    if (isValidValue(categoryId)) {
      await ensureEntityExist(CATEGORY, categoryRepository, { id: categoryId });
      filters.categoryId = categoryId;
    }
  }

  return { execute };
};
