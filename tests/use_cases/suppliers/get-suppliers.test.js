const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const getSuppliersUseCase = require('../../../src/use_cases/suppliers/get-suppliers')(dependencies);
const { SupplierFactory } = require('../../../src/database/factories');

describe('Use Cases - Get Suppliers', () => {
  beforeEach('create five suppliers', async () => {
    await Promise.all(Array(5).fill().map(SupplierFactory.create));
  });

  it('should succeed and return all suppliers', async () => {
    const suppliers = await expect(getSuppliersUseCase.execute()).to.be.fulfilled;
    expect(suppliers.length).to.be.eql(5);
  });
});
