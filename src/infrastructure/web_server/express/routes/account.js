const express = require('express');

const { accountController } = require('../../../../controllers');
const HttpRequest = require('../../../../application/payloads/http-request');
const { TOKEN_COOKIE, SESSION_ID_COOKIE, COOKIE_MAX_AGE } = require('../../../../application/helpers/constants');

const authHandler = require('../middlewares/auth-handler');

const router = express.Router();

router.post('/', (req, res, next) => {
  accountController
    .createAccount(HttpRequest.fromExpress(req))
    .then((httpResponse) => res.status(httpResponse.status).json(httpResponse.toJSON()))
    .catch((error) => next(error));
});

router.post('/sign-in', (req, res, next) => {
  accountController
    .signIn(HttpRequest.fromExpress(req))
    .then((httpResponse) => {
      res.cookie(TOKEN_COOKIE, httpResponse.data.token, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
      res.cookie(SESSION_ID_COOKIE, httpResponse.data.session.id, { maxAge: COOKIE_MAX_AGE, httpOnly: true });
      res.status(httpResponse.status).json(httpResponse.toJSON());
    })
    .catch((error) => next(error));
});

router.put('/sign-out', authHandler, (req, res, next) => {
  accountController
    .signOut(HttpRequest.fromExpress(req))
    .then((httpResponse) => {
      res.clearCookie(TOKEN_COOKIE);
      res.clearCookie(SESSION_ID_COOKIE);
      res.status(httpResponse.status).json(httpResponse.toJSON());
    })
    .catch((error) => next(error));
});

module.exports = router;
