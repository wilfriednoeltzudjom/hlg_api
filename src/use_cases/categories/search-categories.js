const { ensureSearchDataAreValid } = require('../helpers');
const { setAnalyticsOnEachCategory } = require('../helpers/category');

module.exports = function buildSearchCategories({ databaseService }) {
  const { categoryRepository } = databaseService;

  async function execute({ data = {} } = {}) {
    ensureSearchDataAreValid(data);
    const categories = await categoryRepository.search(data);

    return setAnalyticsOnEachCategory(databaseService, categories);
  }

  return { execute };
};
