const HttpRespone = require('../../../../application/payloads/http-response');
const errorParser = require('../../../error_parser');
const logger = require('../../../logger');

module.exports = function (err, req, res, next) {
  const httpResponse = new HttpRespone({
    status: err.status || 500,
    success: false,
    message: err.message,
  });
  if (httpResponse.status === 500) logger.error(errorParser.parseErrorAsString(err));

  res.status(httpResponse.status).json(httpResponse.toJSON());
};
