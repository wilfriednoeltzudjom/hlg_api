const { SupplierRepository } = require('../../../../database/repositories');
const { Supplier } = require('../../../../database/entities');
const { SupplierModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');
const defaultSortingParams = require('../utils/default-sorting-params');

async function parseSupplierModel(supplierModel, data = {}, options = {}) {
  if (!supplierModel) return;

  const supplier = Supplier.fromJSON(Object.assign({}, supplierModel.toJSON(), data));

  return supplier;
}

module.exports = class MongooseSupplierRepository extends SupplierRepository {
  async create(supplier) {
    const supplierModel = new SupplierModel(supplier.toJSON());
    await supplierModel.save();

    return parseSupplierModel(supplierModel);
  }

  async findOne(params = {}) {
    const supplierModel = await SupplierModel.findOne(assignSearchingParams(params));

    return parseSupplierModel(supplierModel);
  }

  async findMany(params = {}) {
    const supplierModels = await SupplierModel.find(assignSearchingParams(params)).sort(defaultSortingParams);

    return Promise.all(supplierModels.map(parseSupplierModel));
  }

  async forceUpdateOne(params = {}, updates = {}) {
    const supplierModel = await SupplierModel.findOne(params);
    Object.assign(supplierModel, updates);
    await supplierModel.save();

    return parseSupplierModel(supplierModel);
  }

  async updateOne(supplier, params = {}) {
    const { id, ...props } = supplier.toJSON();

    return this.forceUpdateOne({ id }, { ...props, ...params });
  }

  async count(params = {}) {
    return SupplierModel.countDocuments(params);
  }

  async safeDeleteOne(supplier, deleteParams) {
    return this.forceUpdateOne({ id: supplier.id }, deleteParams);
  }
};
