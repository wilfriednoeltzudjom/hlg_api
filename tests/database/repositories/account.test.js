const { expect } = require('chai');
const { Account } = require('../../../src/database/entities');
const { AccountFactory } = require('../../../src/database/factories');
const { accountRepository } = require('../../../src/infrastructure/database_service');

describe('Repositories - Account', () => {
  describe('create', () => {
    it('should succeed', async () => {
      const accountData = AccountFactory.generate();
      await expect(accountRepository.create(Account.newInstance(accountData))).to.be.fulfilled;
    });
  });
});
