const { UnauthorizedError } = require('../../../../application/helpers/errors');
const { TOKEN_COOKIE, SESSION_ID_COOKIE } = require('../../../../application/helpers/constants');
const tokenUtils = require('../../../security/token_utils');

module.exports = function (req, res, next) {
  const token = extractToken(req);
  tokenUtils.verifyToken(token);

  req.user = tokenUtils.decodeToken(token).payload;
  req.session = extractSession(req);
  next();
};

function throwUnauthorizedError() {
  throw new UnauthorizedError('You are not allowed to access this resource: token was not found');
}

function extractToken(req) {
  const tokenFromCookie = req.cookies[TOKEN_COOKIE];
  if (tokenFromCookie) return tokenFromCookie;

  const bearerTokenString = req.headers.authorization;
  if (!bearerTokenString) throwUnauthorizedError();

  const tokenFromHeaders = bearerTokenString.split(' ')[1];
  if (!tokenFromHeaders) throwUnauthorizedError();

  return tokenFromHeaders;
}

function extractSession(req) {
  const session = {};
  const sessionId = req.cookies[SESSION_ID_COOKIE];
  if (sessionId) session.id = sessionId;

  return session;
}
