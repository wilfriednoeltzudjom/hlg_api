const { isString } = require('../../application/helpers/entity-utils');
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
    .filter((keyName) => keyName !== 'deleted')
    .filter((keyName) => typeof params[keyName] !== 'object')
    .map((keyName) => `${keyName} `.concat(params[keyName]))
    .join(' or ');
}

async function generateEntityCode(entityName = '', entityRepository) {
  const count = await entityRepository.countAll();
  const codePrefix = `${entityName.substr(0, 2).toUpperCase()}-`;

  return codePrefix.concat(String(count + 1).padStart(5, '0'));
}

function ensureSearchDataAreValid({ searchString } = {}) {
  if (!isString(searchString)) throw new BadRequestError('Parameter <searchString> must be of type <string>');
}

module.exports = { getSafeDeleteParams, ensureEntityExist, findEntity, ensureEntityDoesNotExist, generateEntityCode, ensureSearchDataAreValid };
