const { StaffMemberRepository } = require('../../../../database/repositories');
const { StaffMember } = require('../../../../database/entities');
const { StaffMemberModel } = require('../models');
const assignSearchingParams = require('../utils/assign-searching-params');

module.exports = class MongooseStaffMemberRepository extends StaffMemberRepository {
  async create(staffMember) {
    const staffMemberModel = new StaffMemberModel(staffMember.toJSON());
    staffMemberModel.accountId = staffMember.account.id;
    await staffMemberModel.save();

    return parseStaffMemberModel(staffMemberModel, { account: staffMember.account });
  }

  async findOne(params = {}) {
    const staffMemberModel = await StaffMemberModel.findOne(assignSearchingParams(params));

    return parseStaffMemberModel(staffMemberModel);
  }
};

async function parseStaffMemberModel(staffMemberModel, data = {}) {
  if (!staffMemberModel) return;

  const staffMember = StaffMember.fromJSON(Object.assign(staffMemberModel.toJSON(), data));

  return staffMember;
}
