const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');
const { addressSchema } = require('../schemas');

const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    ...sharedProperties,
    code: { type: String },
    companyName: { type: String },
    email: { type: String },
    phone: { type: String },
    officeAddress: { type: addressSchema, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
