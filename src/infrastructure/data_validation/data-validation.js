const { BadRequestError, ParameterError } = require('../../application/helpers/errors');

function isNull(value) {
  return value === null;
}

module.exports = class DataValidation {
  validateValueAsRequired(value, errorMessagePrefix) {
    if (isNull(value)) throw new ParameterError(`${errorMessagePrefix} is required`);
  }

  validateString(supposedStringValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid string: ${supposedStringValue}`);
  }

  validateStringAsRequired(supposedStringValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedStringValue, errorMessagePrefix);
    this.validateString(supposedStringValue, errorMessagePrefix);
  }

  validateNumber(supposedNumberValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid number: ${supposedNumberValue}`);
  }

  validateNumberAsRequired(supposedNumberValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedNumberValue, errorMessagePrefix);
    this.validateNumber(supposedNumberValue, errorMessagePrefix);
  }

  validateBoolean(supposedBooleanValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid boolean: ${supposedBooleanValue}`);
  }

  validateBooleanAsRequired(supposedBooleanValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedBooleanValue, errorMessagePrefix);
    this.validateBoolean(supposedBooleanValue, errorMessagePrefix);
  }

  validateArray(supposedArrayValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid array: ${supposedArrayValue}`);
  }

  validateArrayAsRequired(supposedArrayValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedArrayValue, errorMessagePrefix);
    this.validateArray(supposedArrayValue, errorMessagePrefix);
  }

  validatePhoneNumber(supposedPhoneNumberValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid phone number: ${supposedPhoneNumberValue}`);
  }

  validatePhoneNumberAsRequired(supposedPhoneNumberValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedPhoneNumberValue, errorMessagePrefix);
    this.validatePhoneNumber(supposedPhoneNumberValue, errorMessagePrefix);
  }

  validateEmail(supposedEmailValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be a valid email: ${supposedEmailValue}`);
  }

  validateEmailAsRequired(supposedEmailValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedEmailValue, errorMessagePrefix);
    this.validateEmail(supposedEmailValue, errorMessagePrefix);
  }

  validateEnum(enumeration, supposedEnumValue, errorMessagePrefix) {
    throw new BadRequestError(`${errorMessagePrefix} must be part of the enum [${Object.values(enumeration)}]: ${supposedEnumValue}`);
  }

  validateEnumAsRequired(enumeration, supposedEnumValue, errorMessagePrefix) {
    this.validateValueAsRequired(supposedEnumValue, errorMessagePrefix);
    this.validateEnum(enumeration, supposedEnumValue, errorMessagePrefix);
  }

  isValidObject(object) {
    return object !== null && Object.keys(object).length > 0;
  }
};
