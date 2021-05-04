const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getProductsUseCase = require('../../../src/use_cases/products/get-products')(dependencies);
const { ProductFactory, CategoryFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Products', () => {
  const shared = {};

  beforeEach(async () => {
    shared.category = await CategoryFactory.create();
    await Promise.all(
      [{ deleted: false }, { deleted: true }, { deleted: false }, { deleted: false, category: shared.category.toJSON() }].map((props) =>
        ProductFactory.create(props)
      )
    );
  });

  it('should succeed without filtering by category', async () => {
    const products = await expect(getProductsUseCase.execute()).to.be.fulfilled;
    expect(products).to.be.lengthOf(3);
  });

  it('should succeed with category filtering', async () => {
    const products = await expect(getProductsUseCase.execute({ categoryId: shared.category.id })).to.be.fulfilled;
    expect(products).to.be.lengthOf(1);
  });
});
