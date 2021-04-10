const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const updateSupplierUseCase = require('../../../src/use_cases/suppliers/update-supplier')(dependencies);
const { SupplierFactory } = require('../../../src/database/factories');

describe('Use Cases - Update Supplier', () => {
  const shared = {};

  beforeEach(async () => {
    shared.supplier = await SupplierFactory.create();
  });

  it('should succeed and update supplier information', async () => {
    const supplierUpdates = SupplierFactory.generate();
    const updatedSupplier = await expect(updateSupplierUseCase.execute({ supplierId: shared.supplier.id, ...supplierUpdates })).to.be.fulfilled;
    expect(updatedSupplier.companyName).to.be.eq(supplierUpdates.companyName);
  });
});
