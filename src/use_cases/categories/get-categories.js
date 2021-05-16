const { setAnalyticsOnEachCategory } = require('../helpers/category');

module.exports = function buildGetCategories({ databaseService }) {
  const { categoryRepository } = databaseService;

  async function execute({ options = {} } = {}) {
    const { withAnalytics = true } = options;
    const categories = await categoryRepository.findMany();

    return withAnalytics ? setAnalyticsOnEachCategory(databaseService, categories) : categories;
  }

  return { execute };
};
