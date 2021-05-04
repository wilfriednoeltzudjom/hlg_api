const HttpResponse = require('../application/payloads/http-response');

const buildCreateSupplierUseCase = require('../use_cases/suppliers/create-supplier');
const buildUpdateSupplierUseCase = require('../use_cases/suppliers/update-supplier');
const buildGetSuppliersUseCase = require('../use_cases/suppliers/get-suppliers');
const buildDeleteSupplierUseCase = require('../use_cases/suppliers/delete-supplier');

module.exports = function buildSupplierController(dependencies) {
  const createSupplierUseCase = buildCreateSupplierUseCase(dependencies);
  const getSuppliersUseCase = buildGetSuppliersUseCase(dependencies);
  const updateSupplierUseCase = buildUpdateSupplierUseCase(dependencies);
  const deleteSupplierUseCase = buildDeleteSupplierUseCase(dependencies);

  async function createSupplier(request) {
    const supplier = await createSupplierUseCase.execute(request.body);

    return HttpResponse.created({
      message: 'Your supplier has been successfully saved',
      data: supplier.toJSON(),
    });
  }

  async function getSuppliers() {
    const suppliers = await getSuppliersUseCase.execute();

    return HttpResponse.succeeded({
      data: suppliers.map((supplier) => supplier.toJSON()),
    });
  }

  async function updateSupplier(request) {
    const supplier = await updateSupplierUseCase.execute({ ...request.params, ...request.body });

    return HttpResponse.succeeded({
      message: 'Your supplier has been successfully updated',
      data: supplier.toJSON(),
    });
  }

  async function deleteSupplier(request) {
    const supplier = await deleteSupplierUseCase.execute({ ...request.params, account: request.user });

    return HttpResponse.succeeded({
      message: `Supplier <${supplier.companyName}> has been successfully deleted`,
      data: supplier.toJSON(),
    });
  }

  return { createSupplier, getSuppliers, updateSupplier, deleteSupplier };
};
