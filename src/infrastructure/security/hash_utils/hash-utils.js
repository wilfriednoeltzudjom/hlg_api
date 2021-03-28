const { BadRequestError } = require('../../../application/helpers/errors');

module.exports = class HashUtils {
  hash() {}

  compareHash({ errorMessage }) {
    throw new BadRequestError(errorMessage);
  }

  isValueSameAsHash() {}
};
