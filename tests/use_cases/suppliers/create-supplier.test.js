const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const createSupplierUseCase = require('../../../src/use_cases/suppliers/create-supplier')(dependencies);
const { SupplierFactory } = require('../../../src/database/factories');
const { BadRequestError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Create Supplier', () => {
  const shared = {};

  beforeEach(() => {
    shared.supplierData = SupplierFactory.generate();
  });

  it('should fail if a supplier with the same email or phone is already created', async () => {
    await SupplierFactory.create(shared.supplierData);
    await expect(createSupplierUseCase.execute(shared.supplierData)).to.be.eventually.rejectedWith(BadRequestError);
  });

  it('should succeed with valid data', async () => {
    const supplier = await expect(createSupplierUseCase.execute(shared.supplierData)).to.be.fulfilled;
    expect(supplier).to.have.property('code');
  });
});
