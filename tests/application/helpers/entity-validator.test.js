const { expect } = require('chai');

const entityValidator = require('../../../src/application/helpers/entity-validator');
const { Category } = require('../../../src/database/entities');

describe('Helpers - Entity validator', () => {
  describe('validate category', () => {
    it('should throw an error if the object is not an instance of category', () => {
      expect(() => {
        entityValidator.validateCategory({ category: {} });
      }).to.throw();
    });

    it('should throw an error if the category is marked as required an no object is passed', () => {
      expect(() => {
        entityValidator.validateCategory({ required: true });
      }).to.throw();
    });

    it('should succeed with a valid instance of category', () => {
      expect(() => {
        entityValidator.validateCategory({ category: Category.newInstance({ code: 'CA000001', name: 'Name', description: 'Description' }) });
      }).to.not.throw();
    });
  });
});
