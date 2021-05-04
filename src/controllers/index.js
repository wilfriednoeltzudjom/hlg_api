const dependencies = require('../application/helpers/dependencies');

const buildAccountController = require('../controllers/account');
const buildStaffMemberController = require('../controllers/staff-member');
const buildSupplierController = require('../controllers/supplier');
const buildCategoryController = require('../controllers/category');
const buildProductController = require('../controllers/product');

module.exports = {
  accountController: buildAccountController(dependencies),
  staffMemberController: buildStaffMemberController(dependencies),
  supplierController: buildSupplierController(dependencies),
  categoryController: buildCategoryController(dependencies),
  productController: buildProductController(dependencies),
};
