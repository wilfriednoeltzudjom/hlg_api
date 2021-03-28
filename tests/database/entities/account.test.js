const { expect } = require('chai');

const { Account } = require('../../../src/database/entities');
const accountRoles = require('../../../src/database/enums/account-roles');

describe('Entities - Account', () => {
  describe('create account', () => {
    it('should succeed with all required properties', () => {
      expect(() => {
        Account.newInstance({ username: 'Username', password: 'Password', role: accountRoles.AGENT });
      }).to.not.throw();
    });
  });
});
