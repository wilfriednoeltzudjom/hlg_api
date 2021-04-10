const mongoose = require('mongoose');

const DatabaseService = require('../database-service');
const MongooseAccountRepository = require('./repositories/account');
const MongooseStaffMemberRepository = require('./repositories/staff-member');
const MongooseSessionRepository = require('./repositories/session');
const MongooseSupplierRepository = require('./repositories/supplier');

module.exports = class MongooseDatabaseService extends DatabaseService {
  initRepositories() {
    this.accountRepository = new MongooseAccountRepository();
    this.staffMemberRepository = new MongooseStaffMemberRepository();
    this.sessionRepository = new MongooseSessionRepository();
    this.supplierRepository = new MongooseSupplierRepository();
  }

  async connectDatabase() {
    return mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  }

  async closeDatabase() {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }

  async startTransaction() {
    const session = await mongoose.startSession();
    session.startTransaction();

    return session;
  }

  async commitTransaction(session) {
    await session.commitTransaction();
  }

  async abortTransaction(session) {
    await session.abortTransaction();
  }

  endTransaction(session) {
    session.endSession();
  }
};
