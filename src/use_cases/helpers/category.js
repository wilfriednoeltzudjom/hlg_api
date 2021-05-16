async function setAnalyticsOnEachCategory(databaseService, categories = []) {
  const { categoryRepository, productRepository } = databaseService;

  return Promise.all(
    categories.map(async function (category) {
      category.subCategoriesCount = await categoryRepository.count({ parentId: category.id });
      category.productsCount = await productRepository.count({ categoryId: category.id });

      return category;
    })
  );
}

module.exports = { setAnalyticsOnEachCategory };
