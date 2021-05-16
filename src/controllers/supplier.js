const HttpResponse = require('../application/payloads/http-response');
const { supplierMessages } = require('../application/helpers/messages');

const buildCreateSupplierUseCase = require('../use_cases/suppliers/create-supplier');
const buildUpdateSupplierUseCase = require('../use_cases/suppliers/update-supplier');
const buildGetSuppliersUseCase = require('../use_cases/suppliers/get-suppliers');
const buildDeleteSupplierUseCase = require('../use_cases/suppliers/delete-supplier');
const buildSearchSuppliersUseCase = require('../use_cases/suppliers/search-suppliers');
const buildGetSuppliersAnalyticsUseCase = require('../use_cases/suppliers/get-suppliers-analytics');

module.exports = function buildSupplierController(dependencies) {
  const createSupplierUseCase = buildCreateSupplierUseCase(dependencies);
  const getSuppliersUseCase = buildGetSuppliersUseCase(dependencies);
  const updateSupplierUseCase = buildUpdateSupplierUseCase(dependencies);
  const deleteSupplierUseCase = buildDeleteSupplierUseCase(dependencies);
  const searchSuppliersUseCase = buildSearchSuppliersUseCase(dependencies);
  const getSuppliersAnalyticsUseCase = buildGetSuppliersAnalyticsUseCase(dependencies);

  async function createSupplier(request) {
    const supplier = await createSupplierUseCase.execute(request.body);

    return HttpResponse.created({
      message: supplierMessages.SUPPLIER_CREATED.FR,
      data: supplier.toJSON(),
    });
  }

  async function getSuppliers(request) {
    const suppliers = await getSuppliersUseCase.execute({ options: request.query });

    return HttpResponse.succeeded({
      data: suppliers.map((supplier) => supplier.toJSON()),
    });
  }

  async function updateSupplier(request) {
    const supplier = await updateSupplierUseCase.execute({ ...request.params, data: request.body });

    return HttpResponse.succeeded({
      message: supplierMessages.SUPPLIER_UPDATED.FR,
      data: supplier.toJSON(),
    });
  }

  async function deleteSupplier(request) {
    const supplier = await deleteSupplierUseCase.execute({ ...request.params, account: request.user });

    return HttpResponse.succeeded({
      message: supplierMessages.SUPPLIER_DELETED({ companyName: supplier.companyName }).FR,
      data: supplier.toJSON(),
    });
  }

  async function searchSuppliers(request) {
    const suppliers = await searchSuppliersUseCase.execute({ data: request.body });

    return HttpResponse.succeeded({
      data: suppliers.map((supplier) => supplier.toJSON()),
    });
  }

  async function getSuppliersAnalytics() {
    const analytics = await getSuppliersAnalyticsUseCase.execute();

    return HttpResponse.succeeded({
      data: analytics,
    });
  }

  return { createSupplier, getSuppliers, updateSupplier, deleteSupplier, searchSuppliers, getSuppliersAnalytics };
};
