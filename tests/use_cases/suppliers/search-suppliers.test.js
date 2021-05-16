const { expect } = require('chai');

const dependencies = require('../../../src/application/helpers/dependencies');
const searchSuppliersUseCase = require('../../../src/use_cases/suppliers/search-suppliers')(dependencies);
const { SupplierFactory } = require('../../../src/database/factories');

describe('Use Cases - Search Suppliers', () => {
  const shared = { suppliersCount: 5, companyNamePrefix: 'company name-', emailSuffix: '-email@supplier.ext' };

  context('search by company name', () => {
    beforeEach(async () => {
      await Promise.all(
        Array(shared.suppliersCount)
          .fill()
          .map((value, index) => shared.companyNamePrefix.concat(index))
          .map((companyName) => SupplierFactory.create({ companyName }))
      );
    });

    it('should return all suppliers that partially match the company name', async () => {
      const suppliers = await expect(searchSuppliersUseCase.execute({ data: { searchString: shared.companyNamePrefix } })).to.be.fulfilled;
      expect(suppliers).to.be.lengthOf(shared.suppliersCount);
    });

    it('should return all suppliers that totally match the company name', async () => {
      const suppliers = await expect(searchSuppliersUseCase.execute({ data: { searchString: shared.companyNamePrefix.concat(0) } })).to.be.fulfilled;
      expect(suppliers).to.be.lengthOf(1);
    });
  });

  context('search by email', () => {
    beforeEach(async () => {
      await Promise.all(
        Array(shared.suppliersCount)
          .fill()
          .map((value, index) => `${index}`.concat(shared.emailSuffix))
          .map((email) => SupplierFactory.create({ email }))
      );
    });

    it('should return all suppliers that partially match the email address', async () => {
      const suppliers = await expect(searchSuppliersUseCase.execute({ data: { searchString: shared.emailSuffix } })).to.be.fulfilled;
      expect(suppliers).to.be.lengthOf(shared.suppliersCount);
    });

    it('should return all suppliers that totally match the email address', async () => {
      const suppliers = await expect(searchSuppliersUseCase.execute({ data: { searchString: '0'.concat(shared.emailSuffix) } })).to.be.fulfilled;
      expect(suppliers).to.be.lengthOf(1);
    });
  });
});
