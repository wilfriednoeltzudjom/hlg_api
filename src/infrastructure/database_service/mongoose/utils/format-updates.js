const { isValidValue } = require('../../../../application/helpers/entity-utils');

module.exports = function (updates = {}) {
  const formattedUpdates = {};
  Object.keys(updates).forEach((propertyName) => {
    const propertyValue = updates[propertyName];
    if (isValidValue(propertyValue)) {
      formattedUpdates[propertyName] = propertyValue;
    }
  });

  return formattedUpdates;
};
