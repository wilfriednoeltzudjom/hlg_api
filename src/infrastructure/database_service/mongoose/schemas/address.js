const { Schema } = require('mongoose');

const sharedOptions = require('./shared-options');

module.exports = new Schema(
  {
    city: { type: String },
    neighborhood: { type: String },
    indication: { type: String },
  },
  sharedOptions
);
