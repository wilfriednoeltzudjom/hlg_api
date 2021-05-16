module.exports = function buildGetSuppliersAnalytics({ databaseService }) {
  const { categoryRepository, productRepository } = databaseService;

  async function execute() {
    const categoriesCount = await categoryRepository.count();
    const usedCategoriesCount = await getUsedCategoriesCount();

    return { categoriesCount, usedCategoriesCount };
  }

  async function getUsedCategoriesCount() {
    const categories = await categoryRepository.findMany();
    const categoriesWithAnalytics = await Promise.all(
      categories.map(async function (category) {
        category.productsCount = await productRepository.count({ categoryId: category.id });

        return category;
      })
    );

    return categoriesWithAnalytics.reduce((accumulator, category) => {
      return category.productsCount > 0 ? accumulator + 1 : accumulator;
    }, 0);
  }

  return { execute };
};
