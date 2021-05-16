const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getSuppliersAnalyticsUseCase = require('../../../src/use_cases/suppliers/get-suppliers-analytics')(dependencies);
const { SupplierFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Suppliers Analytics', () => {
  beforeEach(async () => {
    const suppliers = await Promise.all(Array(5).fill().map(SupplierFactory.create));
    await Promise.all(
      Array(10)
        .fill()
        .map((value, index) => {
          if (index < 5) {
            const supplier = index % 2 === 0 ? suppliers[0] : suppliers[1];

            return ProductFactory.create({ supplier: supplier.toJSON() });
          }

          return ProductFactory.create();
        })
    );
  });

  it('should succeed and return correct analytics', async () => {
    const analytics = await expect(getSuppliersAnalyticsUseCase.execute()).to.be.fulfilled;
    expect(analytics.suppliersCount).to.be.eql(5);
    expect(analytics.usedSuppliersCount).to.be.eql(2);
  });
});
