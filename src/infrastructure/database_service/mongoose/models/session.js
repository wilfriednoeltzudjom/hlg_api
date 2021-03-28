const mongoose = require('mongoose');

const sharedProperties = require('./shared-properties');

const { Schema } = mongoose;

const sessionSchema = new Schema(
  {
    ...sharedProperties,
    startedAt: { type: Date },
    endedAt: { type: Date },
    status: { type: String },
    accountId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Session || mongoose.model('Session', sessionSchema);
