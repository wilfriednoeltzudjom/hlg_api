const { Category } = require('../../database/entities');
const { CATEGORY } = require('../../application/helpers/entities-names');
const { isValidJSONObject } = require('../../application/helpers/entity-utils');
const { ensureEntityDoesNotExist, ensureEntityExist, generateEntityCode } = require('../helpers');

module.exports = function buildCreateCategory({ databaseService }) {
  const { categoryRepository } = databaseService;

  async function execute({ name, description, parent } = {}) {
    const category = Category.newInstance({ name, description });
    await ensureParentIsValid(category, parent);
    await ensureEntityDoesNotExist(CATEGORY, categoryRepository, { name: category.name });
    category.code = await generateEntityCode(CATEGORY, categoryRepository);

    return categoryRepository.create(category);
  }

  async function ensureParentIsValid(category, parent) {
    if (isValidJSONObject(parent)) {
      await ensureEntityExist(CATEGORY, categoryRepository, { id: parent.id });
      category.parent = Category.fromJSON(parent);
    }
  }

  return { execute };
};
