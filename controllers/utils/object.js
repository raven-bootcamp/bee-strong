const filterObjectByKeys = (acceptableKeys, obj) => {
  const result = acceptableKeys.reduce((acc, key) => {
    return key in obj ? { ...acc, [key]: obj[key] } : { ...acc };
  }, {});
  return result;
};

module.exports = {
  filterObjectByKeys,
};
