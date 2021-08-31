const models = require("../../models");

// get all courses filtered by filter
const getAll = async () => {
  const result = await models.Tag.findAll();
  return result;
};

module.exports = {
  getAll,
};
