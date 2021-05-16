const { CategoryRepository } = require('../../../../database/repositories');
const { Category } = require('../../../../database/entities');
const { CategoryModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');
const defaultSortingParams = require('../utils/default-sorting-params');
const formatUpdates = require('../utils/format-updates');
const { isValidValue } = require('../../../../application/helpers/entity-utils');
const diacriticsUtils = require('../../../diacritics_utils');

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
    const data = extractCategoryData(category, restProps, options);

    return this.forceUpdateOne({ id: id || categoryId }, restProps, data, options);
  }

  async count(params = {}) {
    return CategoryModel.countDocuments(assignSearchingParams(params));
  }

  async countAll() {
    return CategoryModel.countDocuments();
  }

  async safeDeleteOne(categoryId, deleteParams) {
    return this.forceUpdateOne({ id: categoryId }, deleteParams);
  }

  async search({ searchString } = {}) {
    const regex = new RegExp(diacriticsUtils.sanitize(searchString), 'gmi');
    const supplierModels = await CategoryModel.find(assignSearchingParams({ searchableStrings: { $in: regex } })).sort(defaultSortingParams);

    return Promise.all(supplierModels.map(parseCategoryModel));
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

function extractCategoryData(category, categoryJSON, options = {}) {
  const data = {};
  if (options.resetParent) {
    categoryJSON.parentId = '';
  } else if (isValidValue(category.parent)) {
    categoryJSON.parentId = category.parent.id;
    data.parent = category.parent;
  }

  return data;
}

module.exports = MongooseCategoryRepository;
