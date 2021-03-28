const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');
const { capitalizePersonName } = require('../../application/helpers/entity-utils');

const buildAddress = require('./address');
const buildUploadedFile = require('./uploaded-file');

const { genders } = require('../enums');

module.exports = function buildStaffMember({ idGeneration, dataValidation, dateUtils }) {
  const Address = buildAddress({ dataValidation });
  const UploadedFile = buildUploadedFile({ dataValidation });

  function validateGender(gender) {
    dataValidation.validateEnumAsRequired(genders, gender, 'Staff member gender');
  }

  function validateFirstName(firstName) {
    dataValidation.validateStringAsRequired(firstName, 'Staff member firstNane');
  }

  function validateLastName(lastName) {
    dataValidation.validateStringAsRequired(lastName, 'Staff member lastName');
  }

  function validateEmail(email) {
    dataValidation.validateEmailAsRequired(email, 'Staff member email');
  }

  function validatePhone(phone) {
    dataValidation.validatePhoneNumberAsRequired(phone, 'Staff member phone');
  }

  function validateIdentityNumber(identityNumber) {
    dataValidation.validateStringAsRequired(identityNumber, 'Staff member identityNumber');
  }

  function validateHomeAddress(homeAddress, required = false) {
    entityValidator.validateAddress({ address: homeAddress, required, errorMessagePrefix: 'Staff member homeAddress' });
  }

  function validatePhoto(photo, required = false) {
    entityValidator.validateUploadedFile({ uploadedFile: photo, required, errorMessagePrefix: 'Staff member photo' });
  }

  function validateAccount(account, required = false) {
    entityValidator.validateAccount({ account, required, errorMessagePrefix: 'Staff member account' });
  }

  return class StaffMember extends Entity {
    #gender;
    #firstName;
    #lastName;
    #birthDate;
    #email;
    #phone;
    #identityNumber;
    #homeAddress;
    #photo;
    #account;

    constructor({
      id,
      createdAt,
      updatedAt,
      updatedBy,
      deleted,
      deletedAt,
      deletedBy,
      gender,
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      identityNumber,
      homeAddress,
      photo,
      account,
    }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      validateGender(gender);
      validateFirstName(firstName);
      validateLastName(lastName);
      validateEmail(email);
      validatePhone(phone);
      validateIdentityNumber(identityNumber);
      validateHomeAddress(homeAddress);
      validatePhoto(photo);
      validateAccount(account);

      this.#gender = gender;
      this.#firstName = firstName;
      this.#lastName = lastName;
      this.#birthDate = birthDate;
      this.#email = email;
      this.#phone = phone;
      this.#identityNumber = identityNumber;
      this.#homeAddress = homeAddress;
      this.#photo = photo;
      this.#account = account;
    }

    get gender() {
      return this.#gender;
    }

    set gender(gender) {
      validateGender(gender);
      this.#gender = gender;
    }

    get firstName() {
      return this.#firstName;
    }

    set firstName(firstName) {
      validateFirstName(firstName);
      this.#firstName = capitalizePersonName(firstName);
    }

    get lastName() {
      return this.#lastName;
    }

    set lastName(lastName) {
      validateLastName(lastName);
      this.#lastName = capitalizePersonName(lastName);
    }

    get birthDate() {
      return this.#birthDate;
    }

    set birthDate(birthDate) {
      this.#birthDate = birthDate;
    }

    get email() {
      return this.#email;
    }

    set email(email) {
      validateEmail(email);
      this.#email = email;
    }

    get phone() {
      return this.#phone;
    }

    set phone(phone) {
      validatePhone(phone);
      this.#phone = phone;
    }

    get identityNumber() {
      return this.#identityNumber;
    }

    set identityNumber(identityNumber) {
      validateIdentityNumber(identityNumber);
      this.#identityNumber = identityNumber;
    }

    get homeAddress() {
      return this.#homeAddress;
    }

    set homeAddress(homeAddress) {
      validateHomeAddress(homeAddress, true);
      this.#homeAddress = homeAddress;
    }

    get photo() {
      return this.#photo;
    }

    set photo(photo) {
      validatePhoto(photo, true);
      this.#photo = photo;
    }

    get account() {
      return this.#account;
    }

    set account(account) {
      validateAccount(account, true);
      this.#account = account;
    }

    toJSON() {
      return Object.assign(super.toJSON(), {
        gender: this.#gender,
        firstName: this.#firstName,
        lastName: this.#lastName,
        birthDate: this.#birthDate,
        email: this.#email,
        phone: this.#phone,
        identityNumber: this.#identityNumber,
        homeAddress: this.#homeAddress ? this.#homeAddress.toJSON() : {},
        photo: this.#photo ? this.#photo.toJSON() : {},
        account: this.#account ? this.#account.toJSON() : {},
      });
    }

    static fromJSON({ homeAddress, photo, ...restProps }) {
      const subProps = {};
      if (dataValidation.isValidObject(homeAddress)) subProps.homeAddress = Address.fromJSON(homeAddress);
      if (dataValidation.isValidObject(photo)) subProps.photo = UploadedFile.fromJSON(photo);

      return new StaffMember({ ...restProps, ...subProps });
    }

    static newInstance({
      id = idGeneration.generateId(),
      createdAt = dateUtils.now(),
      updatedAt = dateUtils.now(),
      updatedBy,
      deleted = false,
      deletedAt,
      deletedBy,
      gender,
      firstName,
      lastName,
      birthDate,
      email,
      phone,
      identityNumber,
      homeAddress,
      photo,
      account,
    }) {
      return new StaffMember({
        id,
        createdAt,
        updatedAt,
        updatedBy,
        deleted,
        deletedAt,
        deletedBy,
        gender,
        firstName: capitalizePersonName(firstName),
        lastName: capitalizePersonName(lastName),
        birthDate,
        email,
        phone,
        identityNumber,
        homeAddress,
        photo,
        account,
      });
    }
  };
};
