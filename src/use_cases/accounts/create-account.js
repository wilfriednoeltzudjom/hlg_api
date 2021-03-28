const { Account } = require('../../database/entities');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildCreateAccount({ databaseService, hashUtils }) {
  const { accountRepository } = databaseService;

  async function execute({ role, username, password } = {}) {
    const account = Account.newInstance({ role, username, password });
    await ensureAccountDoesNotExit(account);
    account.password = await hashUtils.hash(account.password);

    return accountRepository.create(account);
  }

  async function ensureAccountDoesNotExit(account) {
    const existingAccount = await accountRepository.findOne({ username: account.username });
    if (existingAccount) throw new BadRequestError(`Username ${account.username} is already taken`);
  }

  return { execute };
};
