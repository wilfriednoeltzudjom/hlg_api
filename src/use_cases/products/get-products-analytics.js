module.exports = function buildGetAnalytics({ databaseService }) {
  const { productRepository } = databaseService;

  async function execute() {
    const productsCount = await productRepository.count();
    const availableProductsCount = await productRepository.count({ quantity: { $gt: 0 } });

    return { productsCount, availableProductsCount };
  }

  return { execute };
};
