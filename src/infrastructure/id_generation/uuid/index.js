const uuid = require('uuid');

const IdGeneration = require('../id-generation');

module.exports = class UUIDIdGeneration extends IdGeneration {
  generateId() {
    return uuid.v1();
  }
};
