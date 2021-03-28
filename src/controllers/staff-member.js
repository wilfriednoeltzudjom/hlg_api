const HttpResponse = require('../application/payloads/http-response');

const buildCreateStaffMemberUseCase = require('../use_cases/staff_members/create-staff-member');

module.exports = function buildStaffMemberController(dependencies) {
  const createStaffMemberUseCase = buildCreateStaffMemberUseCase(dependencies);

  async function createStaffMember(request) {
    const staffMember = await createStaffMemberUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your staff member has been successfully created',
      data: staffMember.toJSON(),
    });
  }

  return {
    createStaffMember,
  };
};
