const dependencies = require('../../application/helpers/dependencies');

const buildAccountFactory = require('./account');
const buildSupplierFactory = require('./supplier');
const buildCategoryFactory = require('./category');
const buildProductFactory = require('./product');

module.exports = {
  AccountFactory: buildAccountFactory(dependencies),
  SupplierFactory: buildSupplierFactory(dependencies),
  CategoryFactory: buildCategoryFactory(dependencies),
  ProductFactory: buildProductFactory(dependencies),
};
