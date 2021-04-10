const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const accountRoutes = require('./routes/account');
const staffMemberRoutes = require('./routes/staff-member');
const supplierRoutes = require('./routes/supplier');

const authHandler = require('./middlewares/auth-handler');
const errorHandler = require('./middlewares/error-handler');
const loggingHandler = require('./middlewares/logging-handler');
const accessRightsHandler = require('./middlewares/access-rights-handler');

const { accountRoles } = require('../../../database/enums');

const app = express();

app.use(loggingHandler);
app.use(cors({ credentials: true, origin: [process.env.FRONT_APP_BASE_URL] }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/v1/accounts', accountRoutes);
app.use('/v1/staff-members', authHandler, staffMemberRoutes);
app.use('/v1/suppliers', authHandler, accessRightsHandler(accountRoles.MANAGER, accountRoles.DIRECTOR), supplierRoutes);

app.use(errorHandler);

function start(port) {
  return new Promise((resolve) => {
    app.listen(port, resolve);
  });
}

module.exports = { start };
