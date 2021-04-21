const { sessionStatuses } = require('../../database/enums');
const { ensureValuesAreProvided, BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildSignOut({ databaseService, dateUtils }) {
  const { sessionRepository } = databaseService;

  async function execute({ session = {} } = {}) {
    ensureValuesAreProvided([session, session.id], '{session} or {session.id} parameter is missing');

    const persistedSession = await sessionRepository.findOne({ id: session.id });
    if (persistedSession.status === sessionStatuses.ENDED) throw new BadRequestError('Your session has been already ended');
    persistedSession.status = sessionStatuses.ENDED;
    persistedSession.endedAt = dateUtils.now();

    return sessionRepository.updateOne(persistedSession);
  }

  return { execute };
};
