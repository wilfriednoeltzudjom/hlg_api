module.exports = function buildGetSuppliersAnalytics({ databaseService }) {
  const { supplierRepository, productRepository } = databaseService;

  async function execute() {
    const suppliersCount = await supplierRepository.count();
    const usedSuppliersCount = await getUsedSuppliersCount();

    return { suppliersCount, usedSuppliersCount };
  }

  async function getUsedSuppliersCount() {
    const suppliers = await supplierRepository.findMany();
    const suppliersWithAnalytics = await Promise.all(
      suppliers.map(async function (supplier) {
        supplier.productsCount = await productRepository.count({ supplierId: supplier.id });

        return supplier;
      })
    );

    return suppliersWithAnalytics.reduce((accumulator, supplier) => {
      return supplier.productsCount > 0 ? accumulator + 1 : accumulator;
    }, 0);
  }

  return { execute };
};
