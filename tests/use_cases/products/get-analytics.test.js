const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getProductsAnalyticsUseCase = require('../../../src/use_cases/products/get-products-analytics')(dependencies);
const { ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Products Analytics', () => {
  beforeEach('create five products including two with zero as quantity', async () => {
    await Promise.all(
      Array(5)
        .fill()
        .map((value, index) => ProductFactory.create({ quantity: index }))
    );
  });

  it('should succeed and return correct analytics', async () => {
    const analytics = await expect(getProductsAnalyticsUseCase.execute()).to.be.fulfilled;
    expect(analytics.productsCount).to.be.eql(5);
    expect(analytics.availableProductsCount).to.be.eql(4);
  });
});
