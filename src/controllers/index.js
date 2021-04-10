const dependencies = require('../application/helpers/dependencies');

const buildAccountController = require('../controllers/account');
const buildStaffMemberController = require('../controllers/staff-member');
const buildSupplierController = require('../controllers/supplier');

module.exports = {
  accountController: buildAccountController(dependencies),
  staffMemberController: buildStaffMemberController(dependencies),
  supplierController: buildSupplierController(dependencies),
};
