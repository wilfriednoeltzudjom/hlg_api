const moment = require('moment');

const DateUtils = require('../date-utils');

module.exports = class MomentDateUtils extends DateUtils {
  now() {
    return moment().format();
  }
};
