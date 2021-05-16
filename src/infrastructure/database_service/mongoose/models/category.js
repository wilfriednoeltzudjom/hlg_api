const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');
const diacriticsUtils = require('../../../diacritics_utils');
const filterSearchableStrings = require('../utils/filter-searchable-strings');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    ...sharedProperties,
    code: { type: String },
    name: { type: String },
    description: { type: String },
    parentId: { type: String },
    searchableStrings: [{ type: String, index: true }],
  },
  { timestamps: true }
);
categorySchema.pre('save', function () {
  this.searchableStrings = filterSearchableStrings([diacriticsUtils.sanitize(this.code), diacriticsUtils.sanitize(this.name), diacriticsUtils.sanitize(this.description)]);
});

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
