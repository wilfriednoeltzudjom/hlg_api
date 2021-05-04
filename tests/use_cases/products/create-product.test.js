const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const createProductUseCase = require('../../../src/use_cases/products/create-product')(dependencies);
const { ProductFactory, CategoryFactory, SupplierFactory } = require('../../../src/database/factories');
const { BadRequestError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Create Product', () => {
  const shared = {};

  beforeEach(() => {
    shared.productData = ProductFactory.generate();
  });

  it('should fail if a category with the same name already exists', async () => {
    await ProductFactory.create(shared.productData);
    await expect(createProductUseCase.execute(shared.productData)).to.be.eventually.rejectedWith(BadRequestError);
  });

  it('should succeed create a product without a category or supplier', async () => {
    const product = await expect(createProductUseCase.execute(shared.productData)).to.be.fulfilled;
    expect(product).to.have.property('code');
  });

  it('should succeed and create a product with a valid category and supplier', async () => {
    const category = await CategoryFactory.create();
    const supplier = await SupplierFactory.create();
    const product = await expect(createProductUseCase.execute({ ...shared.productData, category: category.toJSON(), supplier: supplier.toJSON() })).to
      .be.fulfilled;
    expect(product.category).to.not.be.null;
    expect(product.supplier).to.not.be.null;
  });
});
