const HttpResponse = require('../application/payloads/http-response');
const { productMessages } = require('../application/helpers/messages');

const buildCreateProductUseCase = require('../use_cases/products/create-product');
const buildGetProductsUseCase = require('../use_cases/products/get-products');
const buildUpdateProductUseCase = require('../use_cases/products/update-product');
const buildDeleteProductUseCase = require('../use_cases/products/delete-product');
const buildSearchProductsUseCase = require('../use_cases/products/search-products');
const buildGetProductsAnalyticsUseCase = require('../use_cases/products/get-products-analytics');

module.exports = function buildProductController(dependencies) {
  const createProductUseCase = buildCreateProductUseCase(dependencies);
  const updateProductUseCase = buildUpdateProductUseCase(dependencies);
  const getProductsUseCase = buildGetProductsUseCase(dependencies);
  const deleteProductUseCase = buildDeleteProductUseCase(dependencies);
  const searchProductsUseCase = buildSearchProductsUseCase(dependencies);
  const getProductsAnalyticsUseCase = buildGetProductsAnalyticsUseCase(dependencies);

  async function createProduct(request) {
    const product = await createProductUseCase.execute(request.body);

    return HttpResponse.created({
      message: productMessages.PRODUCT_CREATED.FR,
      data: product.toJSON(),
    });
  }

  async function updateProduct(request) {
    const product = await updateProductUseCase.execute({ ...request.params, data: request.body, options: request.query });

    return HttpResponse.succeeded({
      message: productMessages.PRODUCT_UPDATED.FR,
      data: product.toJSON(),
    });
  }

  async function getProducts(request) {
    const products = await getProductsUseCase.execute(request.query);

    return HttpResponse.succeeded({
      data: products.map((product) => product.toJSON()),
    });
  }

  async function deleteProduct(request) {
    const product = await deleteProductUseCase.execute({ ...request.params, account: request.user });

    return HttpResponse.succeeded({
      message: productMessages.PRODUCT_DELETED({ name: product.name }).FR,
      data: product.toJSON(),
    });
  }

  async function searchProducts(request) {
    const products = await searchProductsUseCase.execute({ data: request.body });

    return HttpResponse.succeeded({
      data: products.map((product) => product.toJSON()),
    });
  }

  async function getProductsAnalytics(request) {
    const analytics = await getProductsAnalyticsUseCase.execute();

    return HttpResponse.succeeded({
      data: analytics,
    });
  }

  return { createProduct, getProducts, updateProduct, deleteProduct, searchProducts, getProductsAnalytics };
};
