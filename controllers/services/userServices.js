const models = require("../../models");
const sanitize = require("./sanitize");
const bcrypt = require("bcrypt");

// get all users
// return
//  - Array<User>
const getAll = async () => {
  const result = await models.User.findAll({
    attributes: { exclude: ["password"] },
  });
  return result;
};

// authenticate a user login
// argument: { email, password }
// return - int (id) or null
const authenticate = async (cred) => {
  const savedUser = await models.User.findOne({
    where: { email: cred.email },
    include: [models.Student, models.Instructor],
  });
  const isValid = await bcrypt.compare(cred.password, savedUser.password);
  if (!isValid) return null;

  const userWithPassword = sanitize(savedUser);
  const { password, ...userWithoutPassword } = userWithPassword;
  return userWithoutPassword;
};

// get a sigle user
// return - User
const getOne = async (userId) => {
  const result = await models.User.findOne({
    where: { id: userId },
    attributes: { exclude: ["password"] },
    include: [models.Student, models.Instructor],
  });
  return result;
};

module.exports = {
  authenticate,
  getAll,
  getOne,
};
