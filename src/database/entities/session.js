const Entity = require('../../application/helpers/entity');
const entityValidator = require('../../application/helpers/entity-validator');

const { sessionStatuses } = require('../enums');

module.exports = function buildSession({ idGeneration, dataValidation, dateUtils }) {
  function validateStatus(status) {
    dataValidation.validateEnumAsRequired(sessionStatuses, status, 'Session status');
  }

  function validateAccount(account, required = false) {
    entityValidator.validateAccount({ account, required, errorMessagePrefix: 'Session account' });
  }

  return class Session extends Entity {
    #startedAt;
    #endedAt;
    #status;
    #account;

    constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, startedAt, endedAt, status, account }) {
      super({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy });

      validateStatus(status);
      validateAccount(account);

      this.#startedAt = startedAt;
      this.#endedAt = endedAt;
      this.#status = status;
      this.#account = account;
    }

    get startedAt() {
      return this.#startedAt;
    }

    set startedAt(startedAt) {
      this.#startedAt = startedAt;
    }

    get endedAt() {
      return this.#endedAt;
    }

    set endedAt(endedAt) {
      this.#endedAt = endedAt;
    }

    get status() {
      return this.#status;
    }

    set status(status) {
      validateStatus(status);
      this.#status = status;
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
        startedAt: this.#startedAt,
        endedAt: this.#endedAt,
        status: this.#status,
        account: this.#account ? this.#account.toJSON() : {},
      });
    }

    static fromJSON(props) {
      return new Session(props);
    }

    static newInstance({
      id = idGeneration.generateId(),
      createdAt = dateUtils.now(),
      updatedAt = dateUtils.now(),
      updatedBy,
      deleted = false,
      deletedAt,
      deletedBy,
      startedAt = dateUtils.now(),
      endedAt,
      status = sessionStatuses.RUNNING,
      account,
    }) {
      return new Session({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy, startedAt, endedAt, status, account });
    }
  };
};
