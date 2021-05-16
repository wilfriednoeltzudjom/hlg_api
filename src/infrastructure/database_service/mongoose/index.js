const mongoose = require('mongoose');

const DatabaseService = require('../database-service');
const MongooseAccountRepository = require('./repositories/account');
const MongooseStaffMemberRepository = require('./repositories/staff-member');
const MongooseSessionRepository = require('./repositories/session');
const MongooseSupplierRepository = require('./repositories/supplier');
const MongooseCategoryRepository = require('./repositories/category');
const MongooseProductRepository = require('./repositories/product');

const { SupplierModel } = require('./models');

module.exports = class MongooseDatabaseService extends DatabaseService {
  initRepositories() {
    this.accountRepository = new MongooseAccountRepository();
    this.staffMemberRepository = new MongooseStaffMemberRepository();
    this.sessionRepository = new MongooseSessionRepository();
    this.supplierRepository = new MongooseSupplierRepository();
    this.categoryRepository = new MongooseCategoryRepository();
    this.productRepository = new MongooseProductRepository();
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

  async clearDatabase() {
    const { collections } = mongoose.connection;

    return Promise.all(
      Object.keys(collections)
        .map((collectionName) => collections[collectionName])
        .map((collection) => collection.deleteMany())
    );
  }

  async ensureIndexes() {
    await SupplierModel.ensureIndexes();
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
