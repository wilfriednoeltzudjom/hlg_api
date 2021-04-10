const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = {
  id: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: String },
  deleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  deletedBy: { type: String },
};
