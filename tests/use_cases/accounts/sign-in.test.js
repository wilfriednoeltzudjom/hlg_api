const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const signInUseCase = require('../../../src/use_cases/accounts/sign-in')(dependencies);
const { AccountFactory } = require('../../../src/database/factories');
const { accountRoles } = require('../../../src/database/enums');
const cons = require('consolidate');

describe('Use Cases - Sign In', () => {
  const shared = {};

  beforeEach(async () => {
    shared.accountData = {
      username: dependencies.dataGeneration.generateUsername(),
      password: dependencies.dataGeneration.generatePassword(),
      role: accountRoles.ADMINISTRATOR,
    };
    await AccountFactory.create(shared.accountData);
  });

  it('should fail if the username is not recognized', async () => {
    await expect(signInUseCase.execute({ ...shared.accountData, username: '' })).to.be.rejected;
  });

  it('should fail if the provided password is not valid for the username', async () => {
    await expect(signInUseCase.execute({ ...shared.accountData, password: '' })).to.be.rejected;
  });

  it('should successfully login a valid user', async () => {
    const signInResponse = await expect(signInUseCase.execute(shared.accountData)).to.be.fulfilled;
    expect(signInResponse).to.have.property('user');
    expect(signInResponse).to.have.property('token');
    expect(signInResponse).to.have.property('session');
  });
});
