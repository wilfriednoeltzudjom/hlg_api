const databaseService = require('../src/infrastructure/database_service');
const envUtils = require('../src/application/helpers/env-utils');

before(() => {
  envUtils.loadEnvFile('default');
  envUtils.loadEnvFile(process.env.NODE_ENV);
});

beforeEach(async () => {
  await databaseService.connectDatabase();
});

afterEach(async () => {
  await databaseService.closeDatabase();
});
