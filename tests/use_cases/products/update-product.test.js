const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const updateProductUseCase = require('../../../src/use_cases/products/update-product')(dependencies);
const { ProductFactory, CategoryFactory, SupplierFactory } = require('../../../src/database/factories');
const { BadRequestError, ParameterError, ResourceNotFoundError } = require('../../../src/application/helpers/errors');

describe('Use Cases - Update Product', () => {
  const shared = {};

  beforeEach(async () => {
    shared.category = await CategoryFactory.create();
    shared.supplier = await SupplierFactory.create();
    shared.productWithoutRelatedEntities = await ProductFactory.create();
    shared.productWithRelatedEntities = await ProductFactory.create({ category: shared.category.toJSON(), supplier: shared.supplier.toJSON() });
  });

  it('should fail if there the provided data is not valid', async () => {
    await expect(updateProductUseCase.execute({ productId: 'productId' })).to.be.eventually.rejectedWith(ParameterError);
  });

  it('should fail if there is no product associated to the provided id', async () => {
    await expect(
      updateProductUseCase.execute({ productId: 'productId', ...shared.productWithoutRelatedEntities.toJSON() })
    ).to.be.eventually.rejectedWith(ResourceNotFoundError);
  });

  it('should fail if there is already a product with the same name and brand', async () => {
    const { name, brand } = shared.productWithRelatedEntities.toJSON();
    await expect(
      updateProductUseCase.execute({
        productId: shared.productWithoutRelatedEntities.id,
        ...shared.productWithoutRelatedEntities.toJSON(),
        name,
        brand,
      })
    ).to.be.eventually.rejectedWith(BadRequestError);
  });

  it('should succeed and update product information', async () => {
    const { name, brand } = ProductFactory.generate();
    const updatedProduct = await expect(
      updateProductUseCase.execute({
        productId: shared.productWithRelatedEntities.id,
        ...shared.productWithRelatedEntities.toJSON(),
        name,
        brand,
      })
    ).to.be.fulfilled;
    expect(updatedProduct.name).to.be.eql(name);
    expect(updatedProduct.brand).to.be.eql(brand);
  });

  it('should succeed and update product related entities', async () => {
    const updatedProduct = await expect(
      updateProductUseCase.execute({
        productId: shared.productWithoutRelatedEntities.id,
        ...shared.productWithoutRelatedEntities.toJSON(),
        category: shared.category.toJSON(),
        supplier: shared.supplier.toJSON(),
      })
    ).to.be.fulfilled;
    expect(updatedProduct.category.id).to.be.eql(shared.category.id);
    expect(updatedProduct.supplier.id).to.be.eql(shared.supplier.id);
  });
});
