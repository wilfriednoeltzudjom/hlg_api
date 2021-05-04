const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const deleteCategoryUseCase = require('../../../src/use_cases/categories/delete-category')(dependencies);
const { CategoryFactory } = require('../../../src/database/factories');

describe('Use Cases - Delete Category', () => {
  const shared = {};

  beforeEach(async () => {
    shared.category = await CategoryFactory.create();
  });

  it('should succeed and safe delete category', async () => {
    const deletedCategory = await expect(deleteCategoryUseCase.execute({ categoryId: shared.category.id, account: { id: 'id' } })).to.be.fulfilled;
    expect(deletedCategory.deleted).to.be.eq(true);
  });
});
