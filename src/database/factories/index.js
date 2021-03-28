const dependencies = require('../../application/helpers/dependencies');

const buildAccountFactory = require('./account');

module.exports = {
  AccountFactory: buildAccountFactory(dependencies),
};
