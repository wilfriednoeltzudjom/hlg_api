const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getCategoriesUseCase = require('../../../src/use_cases/categories/get-categories')(dependencies);
const { CategoryFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Categories', () => {
  beforeEach('create five categories with 2 as deleted', async () => {
    await Promise.all([true, false, true, false, false].map((deleted) => CategoryFactory.create({ deleted })));
  });

  it('should succeed and return all categories', async () => {
    const categories = await expect(getCategoriesUseCase.execute()).to.be.fulfilled;
    expect(categories.length).to.be.eql(3);
  });
});
