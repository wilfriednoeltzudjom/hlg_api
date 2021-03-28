const express = require('express');

const { staffMemberController } = require('../../../../controllers');
const HttpRequest = require('../../../../application/payloads/http-request');
const { accountRoles } = require('../../../../database/enums');

const accessRightsHandler = require('../middlewares/access-rights-handler');

const router = express.Router();

router.post('/', accessRightsHandler([accountRoles.ADMINISTRATOR]), (req, res, next) => {
  staffMemberController
    .createStaffMember(HttpRequest.fromExpress(req))
    .then((httpResponse) => res.status(httpResponse.status).json(httpResponse.toJSON()))
    .catch((error) => next(error));
});

module.exports = router;
