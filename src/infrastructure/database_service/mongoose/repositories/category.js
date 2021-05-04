const { CategoryRepository } = require('../../../../database/repositories');
const { Category } = require('../../../../database/entities');
const { CategoryModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');
const defaultSortingParams = require('../utils/default-sorting-params');
const formatUpdates = require('../utils/format-updates');
const { isValidValue } = require('../../../../application/helpers/entity-utils');

class MongooseCategoryRepository extends CategoryRepository {
  static newInstance() {
    return new MongooseCategoryRepository();
  }

  async create(category) {
    const categoryModel = new CategoryModel(category.toJSON());
    const data = extractCategoryData(category, categoryModel);
    await categoryModel.save();

    return parseCategoryModel(categoryModel, data);
  }

  async findOne(params = {}, options) {
    const categoryModel = await CategoryModel.findOne(assignSearchingParams(params));

    return parseCategoryModel(categoryModel, {}, options);
  }

  async findMany(params = {}) {
    const categoryModels = await CategoryModel.find(assignSearchingParams(params)).sort(defaultSortingParams);

    return Promise.all(categoryModels.map(parseCategoryModel));
  }

  async forceUpdateOne(params = {}, updates = {}, data = {}, options = {}) {
    const categoryModel = await CategoryModel.findOne(params);
    Object.assign(categoryModel, formatUpdates(updates));
    await categoryModel.save();

    return parseCategoryModel(categoryModel, data, options);
  }

  async updateOne(categoryId, category, options = {}) {
    const { id, ...restProps } = category.toJSON();
    const data = extractCategoryData(category, restProps);

    return this.forceUpdateOne({ id: id || categoryId }, restProps, data, options);
  }

  async count(params = {}) {
    return CategoryModel.countDocuments(assignSearchingParams(params));
  }

  async safeDeleteOne(categoryId, deleteParams) {
    return this.forceUpdateOne({ id: categoryId }, deleteParams);
  }
}

async function parseCategoryModel(categoryModel, data = {}, { includeParent = true } = {}) {
  if (!categoryModel) return;
  const categoryRepository = MongooseCategoryRepository.newInstance();

  const categoryJSON = categoryModel.toJSON();
  const category = Category.fromJSON({ ...categoryJSON, ...data });
  if (includeParent && !isValidValue(category.parent) && isValidValue(categoryJSON.parentId)) {
    category.parent = await categoryRepository.findOne({ id: categoryJSON.parentId });
  }

  return category;
}

function extractCategoryData(category, categoryJSON) {
  const data = {};
  if (isValidValue(category.parent)) {
    categoryJSON.parentId = category.parent.id;
    data.parent = category.parent;
  }

  return data;
}

module.exports = MongooseCategoryRepository;
