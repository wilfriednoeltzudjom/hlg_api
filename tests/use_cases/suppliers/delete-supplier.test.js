const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const { BadRequestError } = require('../../../src/application/helpers/errors');
const deleteSupplierUseCase = require('../../../src/use_cases/suppliers/delete-supplier')(dependencies);
const { SupplierFactory, ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Delete Supplier', () => {
  const shared = {};

  beforeEach(async () => {
    shared.supplier = await SupplierFactory.create();
  });

  it('should fail if the supplier is already associated to some products', async () => {
    await ProductFactory.create({ supplier: shared.supplier.toJSON() });
    await expect(deleteSupplierUseCase.execute({ supplierId: shared.supplier.id })).to.be.eventually.rejectedWith(
      BadRequestError,
      'This supplier is already associated to 1 product(s) and thus can not be deleted'
    );
  });

  it('should succeed and safe delete supplier', async () => {
    const deletedSupplier = await expect(deleteSupplierUseCase.execute({ supplierId: shared.supplier.id, account: { id: 'id' } })).to.be.fulfilled;
    expect(deletedSupplier.deleted).to.be.eq(true);
  });
});
