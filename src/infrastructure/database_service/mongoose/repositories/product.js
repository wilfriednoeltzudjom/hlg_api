const { ProductRepository } = require('../../../../database/repositories');
const { Product } = require('../../../../database/entities');
const { ProductModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');
const defaultSortingParams = require('../utils/default-sorting-params');
const formatUpdates = require('../utils/format-updates');
const { isValidValue } = require('../../../../application/helpers/entity-utils');
const MongooseCategoryRepository = require('./category');
const MongooseSupplierRepository = require('./supplier');

class MongooseProductRepository extends ProductRepository {
  static newInstance() {
    return new MongooseProductRepository();
  }

  async create(product) {
    const productModel = new ProductModel(product.toJSON());
    const data = extractProductData(product, productModel);
    await productModel.save();

    return parseProductModel(productModel, data);
  }

  async findOne(params = {}) {
    const productModel = await ProductModel.findOne(assignSearchingParams(params));

    return parseProductModel(productModel);
  }

  async findMany(params = {}) {
    const productModels = await ProductModel.find(assignSearchingParams(params)).sort(defaultSortingParams);

    return Promise.all(productModels.map(parseProductModel));
  }

  async forceUpdateOne(params = {}, updates = {}, data = {}, options = {}) {
    const productModel = await ProductModel.findOne(params);
    Object.assign(productModel, formatUpdates(updates));
    await productModel.save();

    return parseProductModel(productModel, data, options);
  }

  async updateOne(productId, product, options = {}) {
    const { id, ...restProps } = product.toJSON();
    const data = extractProductData(product, restProps);

    return this.forceUpdateOne({ id: id || productId }, restProps, data, options);
  }

  async count(params = {}) {
    return ProductModel.countDocuments(assignSearchingParams(params));
  }

  async safeDeleteOne(productId, deleteParams) {
    return this.forceUpdateOne({ id: productId }, deleteParams);
  }
}

async function parseProductModel(productModel, data = {}, { includeCategory = true, includeSupplier = true } = {}) {
  if (!productModel) return;
  const categoryRepository = MongooseCategoryRepository.newInstance();
  const supplierRepository = MongooseSupplierRepository.newInstance();

  const productJSON = productModel.toJSON();
  const product = Product.fromJSON({ ...productJSON, ...data });
  if (includeCategory && isValidValue(productJSON.categoryId) && !isValidValue(product.category)) {
    product.category = await categoryRepository.findOne({ id: productJSON.parentId }, { includeParent: false });
  }
  if (includeSupplier && isValidValue(productJSON.supplierId) && !isValidValue(product.supplier)) {
    product.supplier = await supplierRepository.findOne({ id: productJSON.supplierId });
  }

  return product;
}

function extractProductData(product, productJSON) {
  const data = {};
  if (isValidValue(product.category)) {
    productJSON.categoryId = product.category.id;
    data.category = product.category;
  }
  if (isValidValue(product.supplier)) {
    productJSON.supplierId = product.supplier.id;
    data.supplier = product.supplier;
  }

  return data;
}

module.exports = MongooseProductRepository;
