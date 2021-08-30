const models = require("../../models");

// get all students
// return
//  - Array<Student>
const getAll = async () => {
  const result = await models.Student.findAll({
    include: [
      {
        model: models.User,
        attributes: { exclude: ["password"] },
      },
    ],
  });
  return result;
};

// create new student
// return
//  - Student
const create = async (newStudent) => {
  const result = await models.Student.create(newStudent, {
    include: [models.User],
  });
  return result;
};

module.exports = {
  create,
  getAll,
};
