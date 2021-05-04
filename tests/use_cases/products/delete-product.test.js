const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const deleteProductUseCase = require('../../../src/use_cases/products/delete-product')(dependencies);
const { ProductFactory, AccountFactory } = require('../../../src/database/factories');
const { ResourceNotFoundError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Delete Product', () => {
  const shared = {};

  beforeEach(async () => {
    shared.account = await AccountFactory.create();
  });

  it('should fail if there is no product associated to the provided id', async () => {
    await expect(deleteProductUseCase.execute({ account: shared.account.toJSON() })).to.be.eventually.rejectedWith(ResourceNotFoundError);
  });

  it('should succeed with a valid id', async () => {
    const product = await ProductFactory.create();
    const deletedProduct = await expect(deleteProductUseCase.execute({ productId: product.id, account: shared.account.toJSON() })).to.be.fulfilled;
    expect(deletedProduct.deleted).to.be.eql(true);
  });
});
