const envUtils = require('./application/helpers/env-utils');
const databaseService = require('./infrastructure/database_service');
const logger = require('./infrastructure/logger');
const webServer = require('./infrastructure/web_server');

function initEnvironmentVariables() {
  envUtils.loadEnvFile('default');
  if (process.env.NODE_ENV !== 'production') {
    envUtils.loadEnvFile(process.env.NODE_ENV);
  }
}

function initLogger() {
  if (process.env.NODE_ENV === 'production') {
    logger.initProductionTransports();
  }
}

function startServer() {
  initEnvironmentVariables();
  initLogger();

  const PORT = process.env.PORT || process.env.SERVER_PORT;
  webServer
    .start(PORT)
    .then(() => {
      logger.info(`server has started on port ${PORT}`);

      databaseService
        .connectDatabase()
        .then(() => {
          logger.info(`successfully connected to database at uri: ${process.env.MONGODB_URI}`);
        })
        .catch((error) => {
          logger.error(error.message);
        });
    })
    .catch((error) => {
      logger.error(error.message);
    });
}

startServer();
