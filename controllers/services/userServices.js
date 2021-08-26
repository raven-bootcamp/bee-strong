const models = require("../../models");

// get all users
// return
//  - Array<User>
const getAll = async () => {
  const result = await models.User.findAll({
    attributes: { exclude: ["password"] },
  });
  return result;
};

module.exports = {
  getAll,
};
