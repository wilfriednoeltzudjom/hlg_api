const HttpResponse = require('../application/payloads/http-response');

const buildCreateCategoryUseCase = require('../use_cases/categories/create-category');
const buildGetCategoriesUseCase = require('../use_cases/categories/get-categories');
const buildUpdateCategoryUseCase = require('../use_cases/categories/update-category');
const buildDeleteCategoryUseCase = require('../use_cases/categories/delete-category');

module.exports = function buildCategoryController(dependencies) {
  const createCategoryUseCase = buildCreateCategoryUseCase(dependencies);
  const getCategoriesUseCase = buildGetCategoriesUseCase(dependencies);
  const updateCategoryUseCase = buildUpdateCategoryUseCase(dependencies);
  const deleteCategoryUseCase = buildDeleteCategoryUseCase(dependencies);

  async function createCategory(request) {
    const category = await createCategoryUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your category has been successfully saved',
      data: category.toJSON(),
    });
  }

  async function getCategories() {
    const categories = await getCategoriesUseCase.execute();

    return HttpResponse.succeeded({
      data: categories.map((category) => category.toJSON()),
    });
  }

  async function updateCategory(request) {
    const category = await updateCategoryUseCase.execute({ ...request.params, ...request.body });

    return HttpResponse.succeeded({
      message: 'Your category has been successfully updated',
      data: category.toJSON(),
    });
  }

  async function deleteCategory(request) {
    const category = await deleteCategoryUseCase.execute({ ...request.params, account: request.user });

    return HttpResponse.succeeded({
      message: `Category <${category.name}> has been successfully deleted`,
      data: category.toJSON(),
    });
  }

  return { createCategory, getCategories, updateCategory, deleteCategory };
};
