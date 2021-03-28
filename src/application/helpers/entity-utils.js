function capitalizePersonName(name) {
  if (!isString(name)) return name;

  return name.trim().split(' ').map(capitalize).join(' ');
}

function capitalize(value) {
  if (!isString(value)) return value;

  return value[0].toUpperCase().concat(value.substring(1).toLowerCase());
}

function isString(value) {
  return value && typeof value === 'string';
}

module.exports = { capitalize, capitalizePersonName };
