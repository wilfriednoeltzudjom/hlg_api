const { CATEGORY } = require('../../application/helpers/entities-names');
const { ensureEntityExist, getSafeDeleteParams } = require('../helpers');

module.exports = function buildDeleteCategory({ databaseService, dateUtils }) {
  const { categoryRepository } = databaseService;

  async function execute({ categoryId, account } = {}) {
    await ensureEntityExist(CATEGORY, categoryRepository, { id: categoryId });

    return categoryRepository.safeDeleteOne(categoryId, getSafeDeleteParams(dateUtils, account));
  }

  return { execute };
};
