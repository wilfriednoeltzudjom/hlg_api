const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');
const { addressSchema } = require('../schemas');
const diacriticsUtils = require('../../../diacritics_utils');
const filterSearchableStrings = require('../utils/filter-searchable-strings');

const { Schema } = mongoose;

const supplierSchema = new Schema(
  {
    ...sharedProperties,
    code: { type: String },
    companyName: { type: String },
    email: { type: String },
    phone: { type: String },
    officeAddress: { type: addressSchema, default: {} },
    searchableStrings: [{ type: String, index: true }],
  },
  { timestamps: true }
);
supplierSchema.pre('save', function () {
  this.searchableStrings = filterSearchableStrings([
    diacriticsUtils.sanitize(this.code),
    diacriticsUtils.sanitize(this.companyName),
    diacriticsUtils.sanitize(this.email),
    diacriticsUtils.sanitize(this.phone),
  ]);
});

module.exports = mongoose.models.Supplier || mongoose.model('Supplier', supplierSchema);
