const databaseService = require('../src/infrastructure/database_service');
const envUtils = require('../src/application/helpers/env-utils');

before(() => {
  envUtils.loadEnvFile('default');
  envUtils.loadEnvFile(process.env.NODE_ENV);
});

before(async () => {
  await databaseService.connectDatabase();
  await databaseService.ensureIndexes();
});

afterEach(async () => {
  await databaseService.clearDatabase();
});

after(async () => {
  await databaseService.closeDatabase();
});
