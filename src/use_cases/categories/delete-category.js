const { CATEGORY } = require('../../application/helpers/entities-names');
const { BadRequestError } = require('../../application/helpers/errors');
const { ensureEntityExist, getSafeDeleteParams } = require('../helpers');

module.exports = function buildDeleteCategory({ databaseService, dateUtils }) {
  const { categoryRepository, productRepository } = databaseService;

  async function execute({ categoryId, account } = {}) {
    await ensureEntityExist(CATEGORY, categoryRepository, { id: categoryId });
    await ensureCategoryIsDeletable(categoryId);

    return categoryRepository.safeDeleteOne(categoryId, getSafeDeleteParams(dateUtils, account));
  }

  async function ensureCategoryIsDeletable(categoryId) {
    const matchingSubCategoriesCount = await categoryRepository.count({ parentId: categoryId });
    if (matchingSubCategoriesCount > 0) {
      const matchingSubCategoriesCountLabel = matchingSubCategoriesCount > 1 ? 'subcategories' : 'subcategory';
      throw new BadRequestError(`This category has ${matchingSubCategoriesCount} ${matchingSubCategoriesCountLabel} and thus can not be deleted`);
    }

    const matchingProducts = await productRepository.count({ categoryId });
    if (matchingProducts > 0) throw new BadRequestError(`This category already has ${matchingProducts} product(s) and thus can not be deleted`);
  }

  return { execute };
};
