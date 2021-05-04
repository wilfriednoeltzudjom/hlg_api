const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const createCategoryUseCase = require('../../../src/use_cases/categories/create-category')(dependencies);
const { CategoryFactory } = require('../../../src/database/factories');
const { BadRequestError, ResourceNotFoundError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Create Category', () => {
  const shared = {};

  beforeEach(() => {
    shared.categoryData = CategoryFactory.generate();
  });

  it('should fail if a category with the same name already exists', async () => {
    await CategoryFactory.create(shared.categoryData);
    await expect(createCategoryUseCase.execute(shared.categoryData)).to.be.eventually.rejectedWith(BadRequestError);
  });

  it('should succeed create a category without parent', async () => {
    const category = await expect(createCategoryUseCase.execute(shared.categoryData)).to.be.fulfilled;
    expect(category).to.have.property('code');
  });

  it('should fail if the parent is not a valid category', async () => {
    await expect(createCategoryUseCase.execute({ ...shared.categoryData, parent: CategoryFactory.generate() })).to.be.eventually.rejectedWith(
      ResourceNotFoundError
    );
  });

  it('should succeed and create a category with a valid parent', async () => {
    const parent = await CategoryFactory.create();
    const category = await expect(createCategoryUseCase.execute({ ...shared.categoryData, parent: parent.toJSON() })).to.be.fulfilled;
    expect(category.parent).to.not.be.null;
  });
});
