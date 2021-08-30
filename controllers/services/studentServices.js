const models = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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

const getStudentData = async (newStudent) => {
  const { student_name, email, password } = newStudent;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  return {
    student_name,
    user: {
      email,
      password: encryptedPassword,
    },
  };
};

// create new student
// argument : {
//   student_name
//   email
//   password
// }
// return
//  - Student
const create = async (newStudent) => {
  const studentData = await getStudentData(newStudent);
  console.log(studentData);
  const result = await models.Student.create(studentData, {
    include: [models.User],
  });
  return result;
};

module.exports = {
  create,
  getAll,
};
