const { Supplier, Address } = require('../../database/entities');
const { BadRequestError } = require('../../application/helpers/errors');

module.exports = function buildCreateSupplier({ databaseService }) {
  const { supplierRepository } = databaseService;

  async function execute({ companyName, email, phone, officeAddress }) {
    const supplier = Supplier.newInstance({ companyName, email, phone, officeAddress: Address.newInstance(officeAddress) });
    await ensureSupplierDoesNotExist(supplier);
    supplier.code = await generateSupplierCode();

    return supplierRepository.create(supplier);
  }

  async function ensureSupplierDoesNotExist(supplier) {
    const existingSupplier = await supplierRepository.findOne({ $or: [{ email: supplier.email }, { phone: supplier.phone }] });
    if (existingSupplier) throw new BadRequestError(`Supplier with email <${supplier.email}> or phone <${supplier.phone}> already exists`);
  }

  async function generateSupplierCode() {
    const suppliersCount = await supplierRepository.count();
    const codePrefix = 'SU-';

    return codePrefix.concat(String(suppliersCount + 1).padStart(5, '0'));
  }

  return { execute };
};
