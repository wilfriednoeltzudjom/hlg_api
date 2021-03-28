const bcrypt = require('bcryptjs');

const HashUtils = require('../hash-utils');

module.exports = class BcryptJSHashUtils extends HashUtils {
  async hash(value) {
    return bcrypt.hash(value, 10);
  }

  async compareHash({ hash, value, errorMessage }) {
    const sameAsHash = await bcrypt.compare(value, hash);
    if (!sameAsHash) super.compareHash({ errorMessage });
  }

  async isValueSameAsHash({ hash, value }) {
    return bcrypt.compare(value, hash);
  }
};
