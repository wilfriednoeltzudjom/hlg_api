const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getCategoriesUseCase = require('../../../src/use_cases/categories/get-categories')(dependencies);
const { CategoryFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Categories', () => {
  it('should succeed and return all categories', async () => {
    await Promise.all([true, false, true, false, false].map((deleted) => CategoryFactory.create({ deleted })));

    const categories = await expect(getCategoriesUseCase.execute()).to.be.fulfilled;
    expect(categories).to.be.lengthOf(3);
  });

  it('should return all categories with for each of them, their subcategories count', async () => {
    await Promise.all(
      Array(2)
        .fill()
        .map(async function () {
          const category = await CategoryFactory.create();
          await Promise.all([false, true, false].map((deleted) => CategoryFactory.create({ deleted, parent: category.toJSON() })));
        })
    );

    const categories = await expect(getCategoriesUseCase.execute()).to.be.fulfilled;
    expect(categories).to.be.lengthOf(6);
    expect(categories.filter((category) => category.subCategoriesCount === 2)).to.be.lengthOf(2);
  });

  it('should return all categories with each of them, their products count', async () => {
    const category = await CategoryFactory.create();
    await Promise.all(
      Array(3)
        .fill()
        .map(async function () {
          await ProductFactory.create({ category: category.toJSON() });
        })
    );

    const categories = await expect(getCategoriesUseCase.execute()).to.be.fulfilled;
    expect(categories).to.be.lengthOf(1);
    expect(categories[0].productsCount).to.be.eql(3);
  });
});
