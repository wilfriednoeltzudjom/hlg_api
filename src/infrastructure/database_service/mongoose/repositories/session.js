const { SessionRepository } = require('../../../../database/repositories');
const { Session } = require('../../../../database/entities');
const { SessionModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');

module.exports = class MongooseSessionRepository extends SessionRepository {
  async create(session) {
    const sessionModel = new SessionModel(session.toJSON());
    sessionModel.accountId = session.account.id;
    await sessionModel.save();

    return parseSessionModel(sessionModel, { account: session.account });
  }

  async findOne(params = {}) {
    const sessionModel = await SessionModel.findOne(assignSearchingParams(params));

    return parseSessionModel(sessionModel);
  }

  async forceUpdateOne(params = {}, updates = {}) {
    const sessionModel = await SessionModel.findOne(params);
    Object.assign(sessionModel, updates);
    await sessionModel.save();

    return parseSessionModel(sessionModel);
  }

  async updateOne(session) {
    const { id, ...props } = session.toJSON();

    return this.forceUpdateOne({ id }, props);
  }
};

async function parseSessionModel(sessionModel, data = {}) {
  if (!sessionModel) return;

  const session = Session.fromJSON(Object.assign(sessionModel.toJSON(), data));

  return session;
}
