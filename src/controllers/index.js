const dependencies = require('../application/helpers/dependencies');

const buildAccountController = require('../controllers/account');
const buildStaffMemberController = require('../controllers/staff-member');

module.exports = {
  accountController: buildAccountController(dependencies),
  staffMemberController: buildStaffMemberController(dependencies),
};
