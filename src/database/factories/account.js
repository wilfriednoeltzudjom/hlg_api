const { Account } = require('../entities');
const { accountRoles, accountStatuses } = require('../enums');

module.exports = function buildAccount({ dataGeneration, databaseService, hashUtils }) {
  const { accountRepository } = databaseService;

  return {
    generate(initValues = {}) {
      return Object.assign(
        {
          username: dataGeneration.generateUsername(),
          password: dataGeneration.generatePassword(),
          role: dataGeneration.generateEnum(accountRoles),
          status: dataGeneration.generateEnum(accountStatuses),
        },
        initValues
      );
    },

    async create(initValues = {}) {
      const account = Account.newInstance(this.generate(initValues));
      account.password = await hashUtils.hash(account.password);

      return accountRepository.create(account);
    },
  };
};
