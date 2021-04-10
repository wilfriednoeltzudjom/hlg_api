const { UnauthorizedError } = require('../../../../application/helpers/errors');

module.exports = function (...authorizedRoles) {
  return function (req, res, next) {
    const { role } = req.user;
    if (!authorizedRoles.includes(role)) {
      throw new UnauthorizedError(`You can not access this resource: role ${role} is not included in the authorized role's list`);
    }

    next();
  };
};
