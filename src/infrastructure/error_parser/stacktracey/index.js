const StackTracey = require('stacktracey');

const ErrorParser = require('../error-parser');

module.exports = class StackTraceyErrorParser extends ErrorParser {
  parseErrorAsString(error) {
    const errorString = new StackTracey(error).clean().asTable({
      maxColumnWidths: 100,
    });

    return `\n${errorString}`;
  }
};
