const Entity = require('../../application/helpers/entity');
const { BadRequestError } = require('../../application/helpers/errors');

const { accountStatuses, accountRoles } = require('../enums');

module.exports = function buildAccount({ idGeneration, dataValidation, dateUtils }) {
  function validateStatus(status) {
    dataValidation.validateEnumAsRequired(accountStatuses, status, 'Account status');
  }

  function validateRole(role) {
    dataValidation.validateEnumAsRequired(accountRoles, role, 'Account role');
  }

  function validateUsername(username) {
    dataValidation.validateStringAsRequired(username);
    if (username.length < 4) throw new BadRequestError('Account username length must be greater than 4');
  }

  function validatePassword(password) {
    dataValidation.validateStringAsRequired(password, 'Account password');
    if (password.length < 6) throw new BadRequestError('Account password length must be greater than 6');
  }

  return class Account extends Entity {
    #status;
    #role;
    #username;
    #password;

    constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, status, role, username, password }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      validateStatus(status);
      validateRole(role);
      validateUsername(username);

      this.#status = status;
      this.#role = role;
      this.#username = username;
      this.#password = password;
    }

    get status() {
      return this.#status;
    }

    set status(status) {
      validateStatus(status);
      this.#status = status;
    }

    get role() {
      return this.#role;
    }

    set role(role) {
      validateRole(role);
      this.#role = role;
    }

    get username() {
      return this.#username;
    }

    set username(username) {
      validateUsername(username);
      this.#username = username;
    }

    get password() {
      return this.#password;
    }

    set password(password) {
      this.#password = password;
    }

    toJSON() {
      const passwordJSON = {};
      if (this.#password) passwordJSON.password = this.#password;

      return Object.assign(
        super.toJSON(),
        {
          status: this.#status,
          role: this.#role,
          username: this.#username,
        },
        passwordJSON
      );
    }

    static newInstance({
      id = idGeneration.generateId(),
      createdAt = dateUtils.now(),
      updatedAt = dateUtils.now(),
      updatedBy,
      deleted = false,
      deletedAt,
      deletedBy,
      status = accountStatuses.ENABLED,
      role,
      username,
      password,
    } = {}) {
      validatePassword(password);

      return new Account({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, status, role, username, password });
    }
  };
};
