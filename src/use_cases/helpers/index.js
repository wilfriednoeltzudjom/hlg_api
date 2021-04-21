const { ResourceNotFoundError, BadRequestError } = require('../../application/helpers/errors');

function getSafeDeleteParams(dateUtils, account) {
  return { deleted: true, deletedAt: dateUtils.now(), deletedBy: account.id };
}

async function ensureEntityExist(entityName, entityRepository, params) {
  const matchingCount = await entityRepository.count(params);
  if (matchingCount === 0) {
    const paramsString = getParamsKeyValueString(params);
    throw new ResourceNotFoundError(`${entityName} with ${paramsString} was not found`);
  }
}

async function ensureEntityDoesNotExist(entityName, entityRepository, params) {
  const matchingCount = await entityRepository.count(params);
  if (matchingCount > 0) {
    const paramsString = getParamsKeyValueString(params);
    throw new BadRequestError(`${entityName} with ${paramsString} already exists`);
  }
}

async function findEntity(entityName, entityRepository, params = {}, options = {}) {
  const entity = await entityRepository.findOne(params, options);
  if (!entity) {
    const paramsString = getParamsKeyValueString(params);
    throw new ResourceNotFoundError(`${entityName} with ${paramsString} was not found`);
  }

  return entity;
}

function getParamsKeyValueString(params) {
  return Object.keys(params)
    .map((keyName) => `${keyName} <${params[keyName]}>`)
    .join(' or ');
}

module.exports = { getSafeDeleteParams, ensureEntityExist, findEntity, ensureEntityDoesNotExist };
