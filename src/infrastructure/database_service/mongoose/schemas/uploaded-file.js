const { Schema } = require('mongoose');

const sharedOptions = require('./shared-options');

module.exports = new Schema(
  {
    mediaType: { type: String },
    fileDownloadUrl: { type: String },
    fileId: { type: String },
  },
  sharedOptions
);
