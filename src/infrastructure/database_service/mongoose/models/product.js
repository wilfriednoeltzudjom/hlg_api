const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');

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
    description: { type: String },
    categoryId: { type: String },
    supplierId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
