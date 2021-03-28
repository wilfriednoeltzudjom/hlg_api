const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    ...sharedProperties,
    code: { type: String },
    name: { type: String },
    description: { type: String },
    parentId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
