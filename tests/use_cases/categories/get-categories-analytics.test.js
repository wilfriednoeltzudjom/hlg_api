const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getCategoriesAnalyticsUseCase = require('../../../src/use_cases/categories/get-categories-analytics')(dependencies);
const { CategoryFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Categories Analytics', () => {
  beforeEach(async () => {
    const categories = await Promise.all(Array(5).fill().map(CategoryFactory.create));
    await Promise.all(
      Array(10)
        .fill()
        .map((value, index) => {
          if (index < 5) {
            const category = index % 2 === 0 ? categories[0] : categories[1];

            return ProductFactory.create({ category: category.toJSON() });
          }

          return ProductFactory.create();
        })
    );
  });

  it('should succeed and return correct analytics', async () => {
    const analytics = await expect(getCategoriesAnalyticsUseCase.execute()).to.be.fulfilled;
    expect(analytics.categoriesCount).to.be.eql(5);
    expect(analytics.usedCategoriesCount).to.be.eql(2);
  });
});
