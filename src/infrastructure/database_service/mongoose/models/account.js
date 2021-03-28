const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');

const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    ...sharedProperties,
    status: { type: String },
    role: { type: String },
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Account || mongoose.model('Account', accountSchema);
