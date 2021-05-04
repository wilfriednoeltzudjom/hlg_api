const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const updateCategoryUseCase = require('../../../src/use_cases/categories/update-category')(dependencies);
const { CategoryFactory } = require('../../../src/database/factories');
const { BadRequestError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Update Category', () => {
  const shared = {};

  beforeEach('save a category', async () => {
    shared.category = await CategoryFactory.create();
  });

  it('should succeed and update category information', async () => {
    const categoryUpdates = CategoryFactory.generate();
    const updatedCategory = await expect(updateCategoryUseCase.execute({ categoryId: shared.category.id, ...categoryUpdates })).to.be.fulfilled;
    expect(updatedCategory.name).to.be.equal(categoryUpdates.name);
  });

  it("should fail updating category parent if it's the same category", async () => {
    const categoryJSON = shared.category.toJSON();
    await expect(
      updateCategoryUseCase.execute({ categoryId: shared.category.id, ...categoryJSON, parent: categoryJSON })
    ).to.be.eventually.rejectedWith(BadRequestError);
  });

  it('should fail if a category with the same name already exists', async () => {
    const category = await CategoryFactory.create();
    await expect(updateCategoryUseCase.execute({ categoryId: shared.category.id, name: category.name })).to.be.eventually.rejectedWith(
      BadRequestError
    );
  });

  it("should succeed and update category parent if it's different from the category itself", async () => {
    const parent = await CategoryFactory.create();
    const updatedCategory = await expect(
      updateCategoryUseCase.execute({ categoryId: shared.category.id, ...shared.category.toJSON(), parent: parent.toJSON() })
    ).to.be.fulfilled;
    expect(updatedCategory.parent).to.not.be.null;
  });
});
