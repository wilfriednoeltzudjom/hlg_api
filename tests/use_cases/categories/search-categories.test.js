const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const searchCategoriesUseCase = require('../../../src/use_cases/categories/search-categories')(dependencies);
const { CategoryFactory } = require('../../../src/database/factories');

describe('Use Cases - Search Categories', () => {
  const shared = { categoriesCount: 5, namePrefix: 'category name-' };

  context('search by name', () => {
    beforeEach(async () => {
      await Promise.all(
        Array(shared.categoriesCount)
          .fill()
          .map((value, index) => shared.namePrefix.concat(index))
          .map((name) => CategoryFactory.create({ name }))
      );
    });

    it('should return all categories that partially match the category name', async () => {
      const categories = await expect(searchCategoriesUseCase.execute({ data: { searchString: shared.namePrefix } })).to.be.fulfilled;
      expect(categories).to.be.lengthOf(shared.categoriesCount);
    });

    it('should return all suppliers that totally match the category name', async () => {
      const categories = await expect(searchCategoriesUseCase.execute({ data: { searchString: shared.namePrefix.concat(0) } })).to.be.fulfilled;
      expect(categories).to.be.lengthOf(1);
    });
  });
});
