const faker = require('faker');

const DataGeneration = require('../data-generation');

module.exports = class FakerDataGeneration extends DataGeneration {
  generatePersonLastName() {
    return faker.name.lastName();
  }

  generatePersonFirstName() {
    return faker.name.firstName();
  }

  generateUsername() {
    return faker.internet.userName();
  }

  generateDate() {
    return faker.date.soon().toLocaleString();
  }

  generateEmail() {
    return faker.internet.email();
  }

  generateAddress() {
    return {
      city: faker.address.city(),
      neighborhood: faker.address.streetName(),
      indication: faker.address.direction(),
    };
  }

  generatePassword() {
    return faker.internet.password(6);
  }

  generateAlpa(length) {
    return faker.random.alpha({ count: length });
  }

  generateAlpaNumeric(length) {
    return faker.random.alphaNumeric(length);
  }

  generateId() {
    return faker.datatype.uuid();
  }

  generateSupplier() {
    return {
      companyName: faker.company.companyName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber('#########'),
      officeAddress: this.generateAddress(),
    };
  }
};
