const { ParameterError } = require('./errors');

const entitiesClassNames = Object.freeze({
  CATEGORY: 'Category',
  SUPPLIER: 'Supplier',
  ACCOUNT: 'Account',
  ADDRESS: 'Address',
  UPLOADED_FILE: 'UploadedFile',
});

function validateEntity(entity, className, required, errorMessagePrefix) {
  if (required && !entity) throw new ParameterError(`${errorMessagePrefix} is required`);
  if (entity) ensureEntityIsAnInstanceOfClass(entity, className, errorMessagePrefix);
}

function ensureEntityIsAnInstanceOfClass(entity, className, errorMessagePrefix) {
  if (entity.constructor.name !== className) throw new ParameterError(`${errorMessagePrefix} must be an instance of ${className}`);
}

function validateCategory({ category, required = false, errorMessagePrefix } = {}) {
  validateEntity(category, entitiesClassNames.CATEGORY, required, errorMessagePrefix);
}

function validateSupplier({ supplier, required = false, errorMessagePrefix } = {}) {
  validateEntity(supplier, entitiesClassNames.SUPPLIER, required, errorMessagePrefix);
}

function validateAccount({ account, required = false, errorMessagePrefix } = {}) {
  validateEntity(account, entitiesClassNames.ACCOUNT, required, errorMessagePrefix);
}

function validateAddress({ address, required = false, errorMessagePrefix } = {}) {
  validateEntity(address, entitiesClassNames.ADDRESS, required, errorMessagePrefix);
}

function validateUploadedFile({ uploadedFile, required = false, errorMessagePrefix } = {}) {
  validateEntity(uploadedFile, entitiesClassNames.UPLOADED_FILE, required, errorMessagePrefix);
}

module.exports = {
  validateCategory,
  validateSupplier,
  validateAccount,
  validateAddress,
  validateUploadedFile,
};
