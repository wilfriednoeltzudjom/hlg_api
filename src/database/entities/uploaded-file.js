const { uploadedFileMediaTypes } = require('../enums');

module.exports = function buildUploadedFile({ dataValidation }) {
  function validateMediaType(mediaType) {
    dataValidation.validateEnumAsRequired(uploadedFileMediaTypes, mediaType, 'Uploaded file mediaType');
  }

  function validateFileDownloadUrl(fileDownloadUrl) {
    dataValidation.validateStringAsRequired(fileDownloadUrl, 'Uploaded file fileDownloadUrl');
  }

  function validateFileId(fileId) {
    dataValidation.validateStringAsRequired(fileId, 'Uploaded file fileId');
  }

  return class UploadedFile {
    #mediaType;
    #fileDownloadUrl;
    #fileId;

    constructor({ mediaType, fileDownloadUrl, fileId }) {
      validateMediaType(mediaType);
      validateFileDownloadUrl(fileDownloadUrl);
      validateFileId(fileId);

      this.#mediaType = mediaType;
      this.#fileDownloadUrl = fileDownloadUrl;
      this.#fileId = fileId;
    }

    get mediaType() {
      return this.#mediaType;
    }

    set mediaType(mediaType) {
      validateMediaType(mediaType);
      this.#mediaType = mediaType;
    }

    get fileDownloadUrl() {
      return this.#fileDownloadUrl;
    }

    set fileDownloadUrl(fileDownloadUrl) {
      validateFileDownloadUrl(fileDownloadUrl);
      this.#fileDownloadUrl = fileDownloadUrl;
    }

    get fileId() {
      return this.#fileId;
    }

    set fileId(fileId) {
      validateFileId(fileId);
      this.#fileId = fileId;
    }

    toJSON() {
      return {
        mediaType: this.#mediaType,
        fileDownloadUrl: this.#fileDownloadUrl,
        fileId: this.#fileId,
      };
    }

    static fromJSON(props) {
      return new UploadedFile(props);
    }

    static newInstance({ mediaType, fileDownloadUrl, fileId } = {}) {
      return new UploadedFile({ mediaType, fileDownloadUrl, fileId });
    }
  };
};
