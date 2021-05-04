module.exports = function buildGetCategories({ databaseService }) {
  const { categoryRepository } = databaseService;

  async function execute() {
    return categoryRepository.findMany();
  }

  return { execute };
};
