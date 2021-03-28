const { capitalize } = require('../../application/helpers/entity-utils');

module.exports = function buildAddress({ dataValidation }) {
  function validateCity(city) {
    dataValidation.validateStringAsRequired(city, 'Address city');
  }

  function validateNeighborhood(neighborhood) {
    dataValidation.validateStringAsRequired(neighborhood, 'Address neighborhood');
  }

  function validateIndication(indication) {
    dataValidation.validateStringAsRequired(indication, 'Address indication');
  }

  return class Address {
    #city;
    #neighborhood;
    #indication;

    constructor({ city, neighborhood, indication }) {
      validateCity(city);
      validateNeighborhood(neighborhood);
      validateIndication(indication);

      this.#city = city;
      this.#neighborhood = neighborhood;
      this.#indication = indication;
    }

    get city() {
      return this.#city;
    }

    set city(city) {
      validateCity(city);
      this.#city = capitalize(city);
    }

    get neighborhood() {
      return this.#neighborhood;
    }

    set neighborhood(neighborhood) {
      validateNeighborhood(neighborhood);
      this.#neighborhood = capitalize(neighborhood);
    }

    get indication() {
      return this.#indication;
    }

    set indication(indication) {
      validateIndication(indication);
      this.#indication = capitalize(indication);
    }

    toJSON() {
      return {
        city: this.#city,
        neighborhood: this.#neighborhood,
        indication: this.#indication,
      };
    }

    static fromJSON(props) {
      return new Address(props);
    }

    static newInstance({ city, neighborhood, indication } = {}) {
      return new Address({ city: capitalize(city), neighborhood: capitalize(neighborhood), indication: capitalize(indication) });
    }
  };
};
