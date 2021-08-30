const models = require("../../models");

// get all students
// return
//  - Array<Student>
const getAll = async () => {
  const result = await models.Student.findAll({
    include: [models.User],
  });
  return result;
};

module.exports = {
  getAll,
};
