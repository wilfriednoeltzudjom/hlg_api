const { isValidValue } = require('../../application/helpers/entity-utils');
const { ensureEntityExist } = require('.');
const { CATEGORY, SUPPLIER } = require('../../application/helpers/entities-names');

async function ensureRelatedEntitiesAreValid({ categoryRepository, supplierRepository }, product) {
  if (isValidValue(product.category)) await ensureEntityExist(CATEGORY, categoryRepository, { id: product.category.id });
  if (isValidValue(product.supplier)) await ensureEntityExist(SUPPLIER, supplierRepository, { id: product.supplier.id });
}

module.exports = { ensureRelatedEntitiesAreValid };
