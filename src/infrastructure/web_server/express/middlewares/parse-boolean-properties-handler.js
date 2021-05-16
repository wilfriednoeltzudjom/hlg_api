module.exports = function () {
  return function (req, res, next) {
    const { query } = req;
    const parsedBooleanProperties = {};
    Object.keys(query).forEach((queryProperty) => {
      const queryPropertyValue = query[queryProperty];
      if (isBoolean(queryPropertyValue)) parsedBooleanProperties[queryProperty] = JSON.parse(queryPropertyValue);
    });
    Object.assign(req.query, parsedBooleanProperties);

    next();
  };
};

function isBoolean(value) {
  return /false|true/i.test(value);
}
