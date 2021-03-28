const idGeneration = require('../../infrastructure/id_generation');
const dataValidation = require('../../infrastructure/data_validation');
const dateUtils = require('../../infrastructure/date_utils');

const buildAccount = require('./account');
const buildCategory = require('./category');
const buildAddress = require('./address');
const buildSupplier = require('./supplier');
const buildProduct = require('./product');
const buildUploadedFile = require('./uploaded-file');
const buildStaffMember = require('./staff-member');
const buildSession = require('./session');

const dependencies = {
  idGeneration,
  dataValidation,
  dateUtils,
};

module.exports = {
  Account: buildAccount(dependencies),
  Category: buildCategory(dependencies),
  Address: buildAddress(dependencies),
  Supplier: buildSupplier(dependencies),
  Product: buildProduct(dependencies),
  UploadedFile: buildUploadedFile(dependencies),
  Session: buildSession(dependencies),
  StaffMember: buildStaffMember(dependencies),
};
