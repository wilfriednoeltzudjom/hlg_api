const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const searchProductsUseCase = require('../../../src/use_cases/products/search-products')(dependencies);
const { ProductFactory } = require('../../../src/database/factories');

describe('Use Cases - Search Products', () => {
  const shared = { productsCount: 5, namePrefix: 'product name-' };

  context('search by company name', () => {
    beforeEach(async () => {
      await Promise.all(
        Array(shared.productsCount)
          .fill()
          .map((value, index) => shared.namePrefix.concat(index))
          .map((name) => ProductFactory.create({ name }))
      );
    });

    it('should return all suppliers that partially match the product name', async () => {
      const products = await expect(searchProductsUseCase.execute({ data: { searchString: shared.namePrefix } })).to.be.fulfilled;
      expect(products).to.be.lengthOf(shared.productsCount);
    });

    it('should return all suppliers that totally match the product name', async () => {
      const products = await expect(searchProductsUseCase.execute({ data: { searchString: shared.namePrefix.concat(0) } })).to.be.fulfilled;
      expect(products).to.be.lengthOf(1);
    });
  });
});
