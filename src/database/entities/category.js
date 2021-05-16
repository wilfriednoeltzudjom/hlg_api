const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');
const { isValidJSONObject, isValidValue } = require('../../application/helpers/entity-utils');

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

  function validateSubCategoriesCount(subCategoriesCount) {
    dataValidation.validateNumber(subCategoriesCount, 'Category subCategoriesCount');
  }

  function validateProductsCount(subCategoriesCount) {
    dataValidation.validateNumber(subCategoriesCount, 'Category productsCount');
  }

  return class Category extends Entity {
    #code;
    #name;
    #description;
    #parent;

    #subCategoriesCount;
    #productsCount;

    constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, code, name, description, parent }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      if (code) this.code = code;
      this.name = name;
      this.description = description;
      this.parent = parent;
      this.subCategoriesCount = 0;
      this.productsCount = 0;
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
      validateCategory(parent, isValidValue(parent));
      this.#parent = parent;
    }

    get subCategoriesCount() {
      return this.#subCategoriesCount;
    }

    set subCategoriesCount(subCategoriesCount) {
      validateSubCategoriesCount(subCategoriesCount);
      this.#subCategoriesCount = subCategoriesCount;
    }

    get productsCount() {
      return this.#productsCount;
    }

    set productsCount(productsCount) {
      validateProductsCount(productsCount);
      this.#productsCount = productsCount;
    }

    toJSON() {
      return Object.assign(super.toJSON(), {
        code: this.#code,
        name: this.#name,
        description: this.#description,
        parent: this.#parent ? this.#parent.toJSON() : {},
        subCategoriesCount: this.#subCategoriesCount,
        productsCount: this.#productsCount,
      });
    }

    static fromJSON({ parent, ...restProps }) {
      const entities = {};
      if (isValidJSONObject(parent)) entities.parent = Category.fromJSON(parent);
      else if (entityValidator.isInstanceOfCategory(parent)) entities.parent = parent;

      return new Category({ ...restProps, ...entities });
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
