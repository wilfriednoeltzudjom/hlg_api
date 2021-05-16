const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const accountRoutes = require('./routes/account');
const staffMemberRoutes = require('./routes/staff-member');
const supplierRoutes = require('./routes/supplier');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

const authHandler = require('./middlewares/auth-handler');
const errorHandler = require('./middlewares/error-handler');
const loggingHandler = require('./middlewares/logging-handler');
const accessRightsHandler = require('./middlewares/access-rights-handler');
const parseBooleanPropertiesHandler = require('./middlewares/parse-boolean-properties-handler');

const { accountRoles } = require('../../../database/enums');

const app = express();

function start(port) {
  app.use(loggingHandler);
  app.use(cors({ credentials: true, origin: [process.env.FRONT_APP_BASE_URL] }));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.use(parseBooleanPropertiesHandler());

  app.use('/v1/accounts', accountRoutes);
  app.use('/v1/staff-members', authHandler, staffMemberRoutes);
  app.use('/v1/suppliers', authHandler, accessRightsHandler(accountRoles.MANAGER, accountRoles.DIRECTOR), supplierRoutes);
  app.use('/v1/categories', authHandler, accessRightsHandler(accountRoles.MANAGER, accountRoles.DIRECTOR), categoryRoutes);
  app.use('/v1/products', authHandler, accessRightsHandler(accountRoles.MANAGER, accountRoles.DIRECTOR), productRoutes);

  app.use(errorHandler);

  return new Promise((resolve) => {
    app.listen(port, resolve);
  });
}

module.exports = { start };
