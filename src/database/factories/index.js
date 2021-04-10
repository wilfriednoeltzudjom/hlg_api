const dependencies = require('../../application/helpers/dependencies');

const buildAccountFactory = require('./account');
const buildSupplierFactory = require('./supplier');

module.exports = {
  AccountFactory: buildAccountFactory(dependencies),
  SupplierFactory: buildSupplierFactory(dependencies),
};
