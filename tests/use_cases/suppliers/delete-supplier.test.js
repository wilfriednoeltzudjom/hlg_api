const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const deleteSupplierUseCase = require('../../../src/use_cases/suppliers/delete-supplier')(dependencies);
const { SupplierFactory } = require('../../../src/database/factories');

describe('Use Cases - Delete Supplier', () => {
  const shared = {};

  beforeEach(async () => {
    shared.supplier = await SupplierFactory.create();
  });

  it('should succeed and safe delete supplier', async () => {
    const deletedSupplier = await expect(deleteSupplierUseCase.execute({ supplierId: shared.supplier.id, account: { id: 'id' } })).to.be.fulfilled;
    expect(deletedSupplier.deleted).to.be.eq(true);
  });
});
