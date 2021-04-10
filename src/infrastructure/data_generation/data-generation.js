module.exports = class DataGeneration {
  generatePersonLastName() {}

  generatePersonFirstName() {}

  generateUsername() {}

  generateDate() {}

  generatePhoneNumber(phoneNumber = []) {
    if (phoneNumber.length === 9) return phoneNumber.join('');

    const digits = Array.from(Array(10).keys());
    phoneNumber.push(digits[Math.floor(Math.random() * digits.length)]);

    return this.generatePhoneNumber(phoneNumber);
  }

  generateEnum(enumeration) {
    const enumValues = Object.values(enumeration);

    return enumValues[Math.floor(Math.random() * enumValues.length)];
  }

  generateEmail() {}

  generateAddress() {}

  generatePassword() {}

  generateAlpa() {}

  generateAlpaNumeric() {}

  generateId() {}

  generateSupplier() {}

  generateCategory() {}

  generateProduct() {}
};
