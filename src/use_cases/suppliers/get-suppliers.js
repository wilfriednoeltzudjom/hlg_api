module.exports = function buildGetSuppliers({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute() {
    return supplierRepository.findMany();
  }

  return { execute };
};
