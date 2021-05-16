const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');
const diacriticsUtils = require('../../../diacritics_utils');
const filterSearchableStrings = require('../utils/filter-searchable-strings');

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    ...sharedProperties,
    code: { type: String },
    name: { type: String },
    brand: { type: String },
    unitBuyingPrice: { type: Number },
    quantity: { type: Number },
    expirationDate: { type: Date },
    available: { type: Boolean },
    description: { type: String },
    categoryId: { type: String },
    supplierId: { type: String },
    searchableStrings: [{ type: String, index: true }],
  },
  { timestamps: true }
);
productSchema.pre('save', function () {
  this.searchableStrings = filterSearchableStrings([
    diacriticsUtils.sanitize(this.code),
    diacriticsUtils.sanitize(this.name),
    diacriticsUtils.sanitize(this.brand),
    diacriticsUtils.sanitize(this.description),
  ]);
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
