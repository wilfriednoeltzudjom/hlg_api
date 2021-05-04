const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');
const { BadRequestError } = require('../../application/helpers/errors');
const { isValidJSONObject, isValidValue } = require('../../application/helpers/entity-utils');
const buildCategory = require('./category');
const buildSupplier = require('./supplier');

module.exports = function buildProduct({ idGeneration, dataValidation, dateUtils }) {
  const Category = buildCategory({ idGeneration, dataValidation, dateUtils });
  const Supplier = buildSupplier({ idGeneration, dataValidation, dateUtils });

  function validateCode(code) {
    dataValidation.validateStringAsRequired(code, 'Product code');
  }

  function validateName(name) {
    dataValidation.validateStringAsRequired(name, 'Product name');
  }

  function validateBrand(brand) {
    dataValidation.validateStringAsRequired(brand, 'Product brand');
  }

  function validateUnitBuyingPrice(unitBuyingPrice) {
    dataValidation.validateNumberAsRequired(unitBuyingPrice, 'Product unitBuyingPrice');
    if (unitBuyingPrice <= 0) throw new BadRequestError('Product unitBuyingPrice must be greater than zero');
  }

  function validateQuantity(quantity) {
    dataValidation.validateNumberAsRequired(quantity, 'Product quantity');
  }

  function validateAvailable(available) {
    dataValidation.validateBooleanAsRequired(available, 'Product available');
  }

  function validateDescription(description) {
    dataValidation.validateString(description, 'Product description');
  }

  function validateCategory(category, required = false) {
    entityValidator.validateCategory({ category, required, errorMessagePrefix: 'Product category' });
  }

  function validateSupplier(supplier, required = false) {
    entityValidator.validateSupplier({ supplier, required, errorMessagePrefix: 'Product supplier' });
  }

  return class Product extends Entity {
    #code;
    #name;
    #brand;
    #unitBuyingPrice;
    #quantity;
    #expirationDate;
    #available;
    #description;
    #category;
    #supplier;

    constructor({
      id,
      createdAt,
      updatedAt,
      updatedBy,
      deleted,
      deletedAt,
      deletedBy,
      code,
      name,
      brand,
      unitBuyingPrice,
      quantity,
      available,
      expirationDate,
      description,
      category,
      supplier,
    }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      if (code) this.code = code;
      this.name = name;
      this.brand = brand;
      this.unitBuyingPrice = unitBuyingPrice;
      this.quantity = quantity;
      this.expirationDate = expirationDate;
      this.available = available;
      this.description = description;
      this.category = category;
      this.supplier = supplier;
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

    get brand() {
      return this.#brand;
    }

    set brand(brand) {
      validateBrand(brand);
      this.#brand = brand;
    }

    get unitBuyingPrice() {
      return this.#unitBuyingPrice;
    }

    set unitBuyingPrice(unitBuyingPrice) {
      validateUnitBuyingPrice(unitBuyingPrice);
      this.#unitBuyingPrice = unitBuyingPrice;
    }

    get quantity() {
      return this.#quantity;
    }

    set quantity(quantity) {
      validateQuantity(quantity);
      this.#quantity = quantity;
    }

    get expirationDate() {
      return this.#expirationDate;
    }

    set expirationDate(expirationDate) {
      this.#expirationDate = expirationDate;
    }

    get available() {
      return this.#available;
    }

    set available(available) {
      validateAvailable(available);
      this.#available = available;
    }

    get description() {
      return this.#description;
    }

    set description(description) {
      validateDescription(description);
      this.#description = description;
    }

    get category() {
      return this.#category;
    }

    set category(category) {
      validateCategory(category, isValidValue(category));
      this.#category = category;
    }

    get supplier() {
      return this.#supplier;
    }

    set supplier(supplier) {
      validateSupplier(supplier, isValidValue(supplier));
      this.#supplier = supplier;
    }

    toJSON() {
      return Object.assign(super.toJSON(), {
        code: this.#code,
        name: this.#name,
        brand: this.#brand,
        unitBuyingPrice: this.#unitBuyingPrice,
        quantity: this.#quantity,
        expirationDate: this.#expirationDate,
        available: this.#available,
        description: this.#description,
        category: this.#category ? this.#category.toJSON() : {},
        supplier: this.#supplier ? this.#supplier.toJSON() : {},
      });
    }

    static fromJSON({ category, supplier, ...restProps }) {
      const entities = {};
      if (isValidJSONObject(category)) entities.category = Category.fromJSON(category);
      else if (entityValidator.isInstanceOfCategory(category)) entities.category = category;
      if (isValidJSONObject(supplier)) entities.supplier = Supplier.fromJSON(supplier);
      else if (entityValidator.isInstanceOfSupplier(supplier)) entities.supplier = supplier;

      return new Product({ ...restProps, ...entities });
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
      brand,
      unitBuyingPrice,
      quantity,
      expirationDate,
      available = true,
      description,
      category,
      supplier,
    } = {}) {
      return new Product({
        id,
        createdAt,
        updatedAt,
        updatedBy,
        deleted,
        deletedAt,
        deletedBy,
        code,
        name,
        brand,
        unitBuyingPrice,
        quantity,
        expirationDate,
        available,
        description,
        category,
        supplier,
      });
    }
  };
};
