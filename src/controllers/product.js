const HttpResponse = require('../application/payloads/http-response');

const buildCreateProductUseCase = require('../use_cases/products/create-product');
const buildGetProductsUseCase = require('../use_cases/products/get-products');
const buildUpdateProductUseCase = require('../use_cases/products/update-product');
const buildDeleteProductUseCase = require('../use_cases/products/delete-product');

module.exports = function buildProductController(dependencies) {
  const createProductUseCase = buildCreateProductUseCase(dependencies);
  const updateProductUseCase = buildUpdateProductUseCase(dependencies);
  const getProductsUseCase = buildGetProductsUseCase(dependencies);
  const deleteProductUseCase = buildDeleteProductUseCase(dependencies);

  async function createProduct(request) {
    const product = await createProductUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your product has been succeesfully saved',
      data: product.toJSON(),
    });
  }

  async function updateProduct(request) {
    const product = await updateProductUseCase.execute({ ...request.params, ...request.body });

    return HttpResponse.succeeded({
      message: 'Your product has been succeesfully updated',
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
      message: 'Your product has been succeesfully deleted',
      data: product.toJSON(),
    });
  }

  return { createProduct, getProducts, updateProduct, deleteProduct };
};
