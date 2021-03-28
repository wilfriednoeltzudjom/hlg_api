module.exports = class Entity {
  #id;
  #createdAt;
  #updatedAt;
  #updatedBy;
  #deleted;
  #deletedAt;
  #deletedBy;

  constructor({ id, createdAt, updatedAt, updatedBy, deleted, deletedAt, deletedBy }) {
    this.#id = id;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#updatedBy = updatedBy;
    this.#deleted = deleted;
    this.#deletedAt = deletedAt;
    this.#deletedBy = deletedBy;
  }

  get id() {
    return this.#id;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get updatedAt() {
    return this.#updatedAt;
  }

  set updatedAt(updatedAt) {
    this.#updatedAt = updatedAt;
  }

  get updatedBy() {
    return this.#updatedBy;
  }

  set updatedBy(updatedBy) {
    this.#updatedBy = updatedBy;
  }

  get deleted() {
    return this.#deleted;
  }

  set deleted(deleted) {
    this.#deleted = deleted;
  }

  get deletedAt() {
    return this.#deletedAt;
  }

  set deletedAt(deletedAt) {
    this.#deletedAt = deletedAt;
  }

  get deletedBy() {
    return this.#deletedBy;
  }

  set deletedBy(deletedBy) {
    this.#deletedBy = deletedBy;
  }

  toJSON() {
    const json = {
      id: this.#id,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      deleted: this.#deleted,
    };
    if (this.#updatedBy) json.updatedBy = this.#updatedBy;
    if (this.#deletedAt) json.deletedAt = this.#deletedAt;
    if (this.#deletedBy) json.deletedBy = this.#deletedBy;

    return json;
  }
};
