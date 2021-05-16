const HttpResponse = require('../application/payloads/http-response');
const { categoryMessages } = require('../application/helpers/messages');

const buildCreateCategoryUseCase = require('../use_cases/categories/create-category');
const buildGetCategoriesUseCase = require('../use_cases/categories/get-categories');
const buildUpdateCategoryUseCase = require('../use_cases/categories/update-category');
const buildDeleteCategoryUseCase = require('../use_cases/categories/delete-category');
const buildSearchCategoriesUseCase = require('../use_cases/categories/search-categories');
const buildGetCategoriesAnalyticsUseCase = require('../use_cases/categories/get-categories-analytics');

module.exports = function buildCategoryController(dependencies) {
  const createCategoryUseCase = buildCreateCategoryUseCase(dependencies);
  const getCategoriesUseCase = buildGetCategoriesUseCase(dependencies);
  const updateCategoryUseCase = buildUpdateCategoryUseCase(dependencies);
  const deleteCategoryUseCase = buildDeleteCategoryUseCase(dependencies);
  const searchCategoriesUseCase = buildSearchCategoriesUseCase(dependencies);
  const getCategoriesAnalyticsUseCase = buildGetCategoriesAnalyticsUseCase(dependencies);

  async function createCategory(request) {
    const category = await createCategoryUseCase.execute(request.body);

    return HttpResponse.created({
      message: categoryMessages.CATEGORY_CREATED.FR,
      data: category.toJSON(),
    });
  }

  async function getCategories(request) {
    const categories = await getCategoriesUseCase.execute({ options: request.query });

    return HttpResponse.succeeded({
      data: categories.map((category) => category.toJSON()),
    });
  }

  async function updateCategory(request) {
    const category = await updateCategoryUseCase.execute({ ...request.params, data: request.body, options: request.query });

    return HttpResponse.succeeded({
      message: categoryMessages.CATEGORY_UPDATED.FR,
      data: category.toJSON(),
    });
  }

  async function deleteCategory(request) {
    const category = await deleteCategoryUseCase.execute({ ...request.params, account: request.user });

    return HttpResponse.succeeded({
      message: categoryMessages.CATEGORY_DELETED({ name: category.name }).FR,
      data: category.toJSON(),
    });
  }

  async function searchCategories(request) {
    const categories = await searchCategoriesUseCase.execute({ data: request.body });

    return HttpResponse.succeeded({
      data: categories.map((category) => category.toJSON()),
    });
  }

  async function getCategoriesAnalytics() {
    const analytics = await getCategoriesAnalyticsUseCase.execute();

    return HttpResponse.succeeded({
      data: analytics,
    });
  }

  return { createCategory, getCategories, updateCategory, deleteCategory, searchCategories, getCategoriesAnalytics };
};
