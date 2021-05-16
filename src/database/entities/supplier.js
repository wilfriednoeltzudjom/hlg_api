const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');
const { toLowerCase } = require('../../application/helpers/entity-utils');

const buildAddress = require('./address');

module.exports = function buildSupplier({ idGeneration, dataValidation, dateUtils }) {
  const Address = buildAddress({ dataValidation });

  function validateCode(code) {
    dataValidation.validateStringAsRequired(code, 'Supplier code');
  }

  function validateCompanyName(companyName) {
    dataValidation.validateStringAsRequired(companyName, 'Supplier companyName');
  }

  function validateEmail(email) {
    dataValidation.validateEmail(email, 'Supplier email');
  }

  function validatePhone(phone) {
    dataValidation.validatePhoneNumber(phone, 'Supplier phone');
  }

  function validateOfficeAddress(officeAddress, required = false) {
    entityValidator.validateAddress({ address: officeAddress, required, errorMessagePrefix: 'Supplier officeAddress' });
  }

  function validateProductsCount(productsCount) {
    dataValidation.validateNumber(productsCount, 'Supplier products count');
  }

  return class Supplier extends Entity {
    #code;
    #companyName;
    #email;
    #phone;
    #officeAddress;

    #productsCount;

    constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, code, companyName, email, phone, officeAddress }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      if (code) this.code = code;
      this.companyName = companyName;
      if (email) this.email = email;
      if (phone) this.phone = phone;
      this.officeAddress = officeAddress;
      this.productsCount = 0;
    }

    get code() {
      return this.#code;
    }

    set code(code) {
      validateCode(code);
      this.#code = code;
    }

    get companyName() {
      return this.#companyName;
    }

    set companyName(companyName) {
      validateCompanyName(companyName);
      this.#companyName = companyName;
    }

    get email() {
      return this.#email;
    }

    set email(email) {
      validateEmail(email);
      this.#email = toLowerCase(email);
    }

    get phone() {
      return this.#phone;
    }

    set phone(phone) {
      validatePhone(phone);
      this.#phone = phone;
    }

    get officeAddress() {
      return this.#officeAddress;
    }

    set officeAddress(officeAddress) {
      validateOfficeAddress(officeAddress, true);
      this.#officeAddress = officeAddress;
    }

    get productsCount() {
      return this.#productsCount;
    }

    set productsCount(productsCount) {
      validateProductsCount(productsCount);
      this.#productsCount = productsCount;
    }

    toJSON() {
      return {
        ...super.toJSON(),
        code: this.#code,
        companyName: this.#companyName,
        email: this.#email,
        phone: this.#phone,
        officeAddress: this.#officeAddress ? this.#officeAddress.toJSON() : {},
        productsCount: this.#productsCount,
      };
    }

    static fromJSON({ officeAddress, ...restProps }) {
      const subProps = {};
      if (dataValidation.isValidJSONObject(officeAddress)) subProps.officeAddress = Address.fromJSON(officeAddress);

      return new Supplier({ ...restProps, ...subProps });
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
      companyName,
      email,
      phone,
      officeAddress,
    } = {}) {
      return new Supplier({
        id,
        createdAt,
        updatedAt,
        updatedBy,
        deleted,
        deletedAt,
        deletedBy,
        code,
        companyName,
        email,
        phone,
        officeAddress,
      });
    }
  };
};
