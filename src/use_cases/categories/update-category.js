const { Category } = require('../../database/entities');
const { ensureEntityExist, ensureEntityDoesNotExist } = require('../helpers');
const { CATEGORY } = require('../../application/helpers/entities-names');
const { isValidValue } = require('../../application/helpers/entity-utils');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildUpdateCategory({ databaseService }) {
  const { categoryRepository } = databaseService;

  async function execute({ categoryId, data = {}, options = { resetParent: false } } = {}) {
    const category = Category.fromJSON(data);
    await ensureEntityExist(CATEGORY, categoryRepository, { id: categoryId });
    await ensureParentIsValid(categoryId, category, options);
    await ensureEntityDoesNotExist(CATEGORY, categoryRepository, { name: category.name, id: { $ne: categoryId } });

    return categoryRepository.updateOne(categoryId, category, options);
  }

  async function ensureParentIsValid(categoryId, category, options) {
    if (options.resetParent) return;
    if (!isValidValue(category.parent)) return;
    if (categoryId === category.parent.id) throw new BadRequestError(`Can not assign the same category as its own parent`);
    await ensureEntityExist(CATEGORY, categoryRepository, { id: category.parent.id });
    await ensureCategoryIsNotTheParentOfTheParent(categoryId, category);
  }

  async function ensureCategoryIsNotTheParentOfTheParent(categoryId, category) {
    const matchingCount = await categoryRepository.count({ id: category.parent.id, parentId: categoryId });
    if (matchingCount) throw new BadRequestError(`Category <${category.name}> is already a parent of category <${category.parent.name}>`);
  }

  return { execute };
};
