const { ensureSearchDataAreValid } = require('../helpers');

module.exports = function buildSearchProducts({ databaseService }) {
  const { productRepository } = databaseService;

  async function execute({ data = {} } = {}) {
    ensureSearchDataAreValid(data);

    return productRepository.search(data);
  }
  return { execute };
};
