const EmailValidator = require('email-validator');

const DataValidation = require('../data-validation');

module.exports = class CommonDataValidation extends DataValidation {
  validateString(supposedStringValue, errorMessagePrefix) {
    if (isNotNull(supposedStringValue) && !isString(supposedStringValue)) {
      super.validateString(supposedStringValue, errorMessagePrefix);
    }
  }

  validateNumber(supposedNumberValue, errorMessagePrefix) {
    if (isNotNull(supposedNumberValue) && !isNumber(supposedNumberValue)) {
      super.validateNumber(supposedNumberValue, errorMessagePrefix);
    }
  }

  validateBoolean(supposedBooleanValue, errorMessagePrefix) {
    if (isNotNull(supposedBooleanValue) && !isBoolean(supposedBooleanValue)) {
      super.validateBoolean(supposedBooleanValue, errorMessagePrefix);
    }
  }

  validateArray(supposedArrayValue, errorMessagePrefix) {
    if (isNotNull(supposedArrayValue) && !isArray(supposedArrayValue)) {
      super.validateArray(supposedArrayValue, errorMessagePrefix);
    }
  }

  validatePhoneNumber(supposedPhoneNumberValue, errorMessagePrefix) {
    if (isNotNull(supposedPhoneNumberValue) && !isPhoneNumber(supposedPhoneNumberValue)) {
      super.validatePhoneNumber(supposedPhoneNumberValue, errorMessagePrefix);
    }
  }

  validateEmail(supposedEmailValue, errorMessagePrefix) {
    if (isNotNull(supposedEmailValue) && !isEmail(supposedEmailValue)) {
      super.validateEmail(supposedEmailValue, errorMessagePrefix);
    }
  }

  validateEnum(enumeration, supposedEnumValue, errorMessagePrefix) {
    if (isNotNull(supposedEnumValue) && !isIncludedInEnum(enumeration, supposedEnumValue)) {
      super.validateEnum(enumeration, supposedEnumValue, errorMessagePrefix);
    }
  }
};

function isNotNull(value) {
  return value !== null;
}

function isString(value) {
  return typeof value === 'string';
}

function isBoolean(value) {
  return typeof value === 'boolean';
}

function isArray(value) {
  return Array.isArray(value);
}

function isNumber(value) {
  return typeof value === 'number';
}

function isPhoneNumber(value) {
  return /\d{9}/.test(value);
}

function isEmail(value) {
  return EmailValidator.validate(value);
}

function isIncludedInEnum(enumeration, value) {
  return Object.values(enumeration).includes(value);
}
