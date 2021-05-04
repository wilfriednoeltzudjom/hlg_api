const { SupplierRepository } = require('../../../../database/repositories');
const { Supplier } = require('../../../../database/entities');
const { SupplierModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');
const defaultSortingParams = require('../utils/default-sorting-params');
const formatUpdates = require('../utils/format-updates');

module.exports = class MongooseSupplierRepository extends SupplierRepository {
  static newInstance() {
    return new MongooseSupplierRepository();
  }

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
    Object.assign(supplierModel, formatUpdates(updates));
    await supplierModel.save();

    return parseSupplierModel(supplierModel);
  }

  async updateOne(supplierId, supplier, options = {}) {
    const { id, ...props } = supplier.toJSON();

    return this.forceUpdateOne({ id: id || supplierId }, props, options);
  }

  async count(params = {}) {
    return SupplierModel.countDocuments(assignSearchingParams(params));
  }

  async safeDeleteOne(supplierId, deleteParams) {
    return this.forceUpdateOne({ id: supplierId }, deleteParams);
  }
};

async function parseSupplierModel(supplierModel, data = {}) {
  if (!supplierModel) return;

  const supplier = Supplier.fromJSON({ ...supplierModel.toJSON(), ...data });

  return supplier;
}
