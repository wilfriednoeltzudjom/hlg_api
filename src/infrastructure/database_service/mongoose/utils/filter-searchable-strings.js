const { isValidValue } = require('../../../../application/helpers/entity-utils');

module.exports = function (searchableValues = []) {
  return searchableValues.filter((value) => isNotEmptyString(value));
};

function isNotEmptyString(value) {
  return isValidValue(value) && value.length > 0;
}
