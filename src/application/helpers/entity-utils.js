function capitalizePersonName(name) {
  if (!isString(name)) return name;

  return name.trim().split(' ').map(capitalize).join(' ');
}

function capitalize(value) {
  if (!isString(value)) return value;

  return value[0].toUpperCase().concat(value.substring(1).toLowerCase());
}

function toLowerCase(value) {
  if (!isString(value)) return value;

  return value.toLowerCase();
}

function isString(value) {
  return value && typeof value === 'string';
}

function isValidValue(value) {
  return ![undefined, null].includes(value);
}

function isValidJSONObject(object) {
  return isValidValue(object) && Object.keys(object).length > 0;
}

module.exports = { capitalize, capitalizePersonName, toLowerCase, isValidValue, isValidJSONObject };
