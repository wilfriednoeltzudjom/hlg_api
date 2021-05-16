const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getSuppliersUseCase = require('../../../src/use_cases/suppliers/get-suppliers')(dependencies);
const { SupplierFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Suppliers', () => {
  it('should succeed and return all suppliers', async () => {
    await Promise.all(Array(5).fill().map(SupplierFactory.create));

    const suppliers = await expect(getSuppliersUseCase.execute()).to.be.fulfilled;
    expect(suppliers.length).to.be.eql(5);
  });

  it('should return all suppliers, with for each of them, their products count', async () => {
    const supplier = await SupplierFactory.create();
    await Promise.all(
      Array(2)
        .fill()
        .map(() => ProductFactory.create({ supplier: supplier.toJSON() }))
    );

    const suppliers = await expect(getSuppliersUseCase.execute()).to.be.fulfilled;
    expect(suppliers).to.be.lengthOf(1);
    expect(suppliers[0].productsCount).to.be.eql(2);
  });
});
