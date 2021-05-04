const { AccountRepository } = require('../../../../database/repositories');
const { Account } = require('../../../../database/entities');
const { AccountModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');

module.exports = class MongooseAccountRepository extends AccountRepository {
  async create(account) {
    const accountModel = new AccountModel(account.toJSON());
    await accountModel.save();

    return parseAccountModel(accountModel);
  }

  async findOne(params = {}, options = {}) {
    const accountModel = await AccountModel.findOne(assignSearchingParams(params));

    return parseAccountModel(accountModel, {}, options);
  }
};

function parseAccountModel(accountModel, data = {}, { includePassword = false } = {}) {
  if (!accountModel) return;

  if (!includePassword) accountModel.set('password', undefined);

  return new Account(accountModel);
}
