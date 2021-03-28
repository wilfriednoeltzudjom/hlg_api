module.exports = class HttpResponse {
  #status;
  #success;
  #message;
  #data;

  constructor({ status, success, message, data }) {
    this.#status = status;
    this.#success = success;
    this.#message = message;
    this.#data = data;
  }

  get status() {
    return this.#status;
  }

  get data() {
    return this.#data;
  }

  toJSON() {
    return {
      success: this.#success,
      message: this.#message,
      data: this.#data,
    };
  }

  static created({ message, data }) {
    return new HttpResponse({ message, data, status: 201, success: true });
  }

  static succeeded({ message, data }) {
    return new HttpResponse({ message, data, status: 200, success: true });
  }
};
