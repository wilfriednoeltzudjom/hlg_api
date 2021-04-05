const { Session } = require('../../database/entities');
const { accountRoles, sessionStatuses } = require('../../database/enums');
const { ResourceNotFoundError, BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildSignIn({ databaseService, hashUtils, tokenUtils }) {
  const { accountRepository, staffMemberRepository, sessionRepository } = databaseService;

  async function execute({ username, password, role }) {
    const account = await accountRepository.findOne({ username }, { includePassword: true });
    if (!account) throw new ResourceNotFoundError(`Account with username <${username}> was not found`);
    if (role && role !== account.role) throw new BadRequestError(`You're not authorized to access this app`);

    const sameAsHash = await hashUtils.isValueSameAsHash({ value: password, hash: account.password });
    if (!sameAsHash) throw new BadRequestError(`Invalid password <${password}> for username <${username}>`);
    account.password = undefined;
    await ensureThereIsNoActiveSession(account);

    return createSignInResponse(account);
  }

  async function ensureThereIsNoActiveSession(account) {
    const existingSession = await sessionRepository.findOne({ accountId: account.id, status: sessionStatuses.RUNNING });
    if (existingSession) throw new BadRequestError(`Username <${account.username}> already has an active session`);
  }

  async function createSignInResponse(account) {
    const signInResponse = { user: account.toJSON() };
    if ([accountRoles.DIRECTOR, accountRoles.MANAGER, accountRoles.AGENT].includes(account.role)) {
      const staffMember = await staffMemberRepository.findOne({ accountId: account.id }, { includeAccount: false });
      staffMember.account = account;
      signInResponse.user = staffMember.toJSON();
    }

    const tokenPayload = { id: account.id, username: account.username, role: account.role };
    const tokenOptions = {};
    if (account.role === accountRoles.AGENT) tokenOptions.expiresIn = '24h';
    signInResponse.token = tokenUtils.generateToken(tokenPayload, tokenOptions);

    const session = await sessionRepository.create(Session.newInstance({ account }));
    signInResponse.session = { id: session.id, startedAt: session.startedAt };

    return signInResponse;
  }

  return { execute };
};
