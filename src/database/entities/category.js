const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');

module.exports = function buildCategory({ idGeneration, dataValidation, dateUtils }) {
  function validateCode(code) {
    dataValidation.validateStringAsRequired(code, 'Category code');
  }

  function validateName(name) {
    dataValidation.validateStringAsRequired(name, 'Category name');
  }

  function validateDescription(description) {
    dataValidation.validateString(description, 'Category description');
  }

  function validateCategory(category, required = false) {
    entityValidator.validateCategory({ category, required, errorMessagePrefix: 'Category parent' });
  }

  return class Category extends Entity {
    #code;
    #name;
    #description;
    #parent;

    constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, code, name, description, parent }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      validateCode(code);
      validateName(name);
      validateDescription(description);
      validateCategory(parent);

      this.#code = code;
      this.#name = name;
      this.#description = description;
      this.#parent = parent;
    }

    get code() {
      return this.#code;
    }

    set code(code) {
      validateCode(code);
      this.#code = code;
    }

    get name() {
      return this.#name;
    }

    set name(name) {
      validateName(name);
      this.#name = name;
    }

    get description() {
      return this.#description;
    }

    set description(description) {
      validateDescription(description);
      this.#description = description;
    }

    get parent() {
      return this.#parent;
    }

    set parent(parent) {
      validateCategory(parent, true);
      this.#parent = parent;
    }

    toJSON() {
      return Object.assign(super.toJSON(), {
        code: this.#code,
        name: this.#name,
        description: this.#description,
        parent: this.#parent ? this.#parent.toJSON() : {},
      });
    }

    static newInstance({
      id = idGeneration.generateId(),
      createdAt = dateUtils.now(),
      updatedAt = dateUtils.now(),
      updatedBy,
      deleted = false,
      deletedAt,
      deletedBy,
      code,
      name,
      description,
      parent,
    } = {}) {
      return new Category({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, code, name, description, parent });
    }
  };
};
