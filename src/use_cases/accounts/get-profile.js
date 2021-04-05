const { accountRoles } = require('../../database/enums');
const { ResourceNotFoundError } = require('../../application/helpers/errors');

module.exports = function buildGetProfile({ databaseService }) {
  const { accountRepository, staffMemberRepository } = databaseService;

  async function execute({ user }) {
    const profile = {};
    const account = await accountRepository.findOne({ id: user.id });
    if (!account) throw new ResourceNotFoundError(`Account with id <${id}> was not found`);

    if ([accountRoles.DIRECTOR, accountRoles.MANAGER, accountRoles.AGENT].includes(account.role)) {
      const staffMember = await staffMemberRepository.findOne({ accountId: account.id }, { includeAccount: false });
      staffMember.account = account;
      Object.assign(profile, staffMember.toJSON());
    }

    return profile;
  }

  return { execute };
};
