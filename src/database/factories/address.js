module.exports = function buildAddress({ dataGeneration }) {
  return {
    generate(initValues = {}) {
      return Object.assign(dataGeneration.generateAddress(), initValues);
    },
  };
};
