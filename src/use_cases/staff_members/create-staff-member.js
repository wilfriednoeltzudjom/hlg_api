const { StaffMember, Address } = require('../../database/entities');
const { BadRequestError } = require('../../application/helpers/errors');

const buildCreateAccountUseCase = require('../accounts/create-account');

module.exports = function buildCreateStaffMember({ databaseService, hashUtils }) {
  const { staffMemberRepository } = databaseService;
  const createAccountUseCase = buildCreateAccountUseCase({ databaseService, hashUtils });

  async function execute({ gender, firstName, lastName, birthDate, email, phone, identityNumber, homeAddress, role, username, password }) {
    const staffMember = StaffMember.newInstance({ gender, firstName, lastName, birthDate, phone, email, identityNumber });
    staffMember.homeAddress = Address.newInstance(homeAddress);
    await ensureStaffMemberDoesNotExit(staffMember);
    staffMember.account = await createAccountUseCase.execute({ role, username, password });

    return staffMemberRepository.create(staffMember);
  }

  async function ensureStaffMemberDoesNotExit(staffMember) {
    const existingStaffMember = await staffMemberRepository.findOne({
      $or: [{ phone: staffMember.phone }, { email: staffMember.email }, { identityNumber: staffMember.identityNumber }],
    });
    if (existingStaffMember) {
      throw new BadRequestError(
        `Staff member with email <${staffMember.email}>, phone <${staffMember.phone}> or identityNumber <${staffMember.identityNumber}> already exists`
      );
    }
  }

  return { execute };
};
