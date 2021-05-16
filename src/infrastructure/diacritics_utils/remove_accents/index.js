const removeAccents = require('remove-accents');

const DiacritisUtils = require('../diacritics-utils');

module.exports = class RemoveAccentsDiacritics extends DiacritisUtils {
  sanitize(value = '') {
    return removeAccents.remove(value).toLowerCase().trim();
  }
};
