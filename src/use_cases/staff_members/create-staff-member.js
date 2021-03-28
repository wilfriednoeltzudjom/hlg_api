const { StaffMember, Address } = require('../../database/entities');
const { BadRequestError } = require('../../application/helpers/errors');

const buildCreateAccountUseCase = require('../accounts/create-account');

module.exports = function buildCreateStaffMember({ databaseService, hashUtils }) {
  const { staffMemberRepository } = databaseService;
  const createAccountUseCase = buildCreateAccountUseCase({ databaseService, hashUtils });

  async function execute({
    gender,
    firstName,
    lastName,
    birthDate,
    email,
    phone,
    identityNumber,
    city,
    neighborhood,
    indication,
    role,
    username,
    password,
  }) {
    const staffMember = StaffMember.newInstance({ gender, firstName, lastName, birthDate, phone, email, identityNumber });
    staffMember.homeAddress = Address.newInstance({ city, neighborhood, indication });
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
        `A staff member has been already created with one of the information email: ${staffMember.email}, phone: ${staffMember.phone}, identityNumber: ${staffMember.identityNumber}`
      );
    }
  }

  return { execute };
};
