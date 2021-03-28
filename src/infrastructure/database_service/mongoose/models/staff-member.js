const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');
const { addressSchema, uploadedFileSchema } = require('../schemas');

const { Schema } = mongoose;

const staffMemberSchema = new Schema(
  {
    ...sharedProperties,
    gender: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    birthDate: { type: Date },
    email: { type: String },
    phone: { type: String },
    identityNumber: { type: String },
    homeAddress: { type: addressSchema, default: {} },
    photo: { type: uploadedFileSchema, default: {} },
    accountId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.StaffMember || mongoose.model('StaffMember', staffMemberSchema);
