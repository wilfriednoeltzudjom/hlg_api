const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const { BadRequestError } = require('../../../src/application/helpers/errors');
const deleteCategoryUseCase = require('../../../src/use_cases/categories/delete-category')(dependencies);
const { CategoryFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Delete Category', () => {
  const shared = {};

  beforeEach(async () => {
    shared.category = await CategoryFactory.create();
  });

  it('should if the category to delete already has sub categories', async () => {
    await CategoryFactory.create({ parent: shared.category.toJSON() });
    await expect(deleteCategoryUseCase.execute({ categoryId: shared.category.id })).to.be.eventually.rejectedWith(
      BadRequestError,
      'This category has 1 subcategory and thus can not be deleted'
    );
  });

  it('should fail if the category already has products', async () => {
    await ProductFactory.create({ category: shared.category.toJSON() });
    await expect(deleteCategoryUseCase.execute({ categoryId: shared.category.id })).to.be.eventually.rejectedWith(
      BadRequestError,
      'This category already has 1 product(s) and thus can not be deleted'
    );
  });

  it('should succeed and safe delete category', async () => {
    const deletedCategory = await expect(deleteCategoryUseCase.execute({ categoryId: shared.category.id, account: { id: 'id' } })).to.be.fulfilled;
    expect(deletedCategory.deleted).to.be.eq(true);
  });
});
