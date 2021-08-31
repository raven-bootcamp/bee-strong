const models = require("../../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// get all instructors
// return
//  - Array<Instructors>
const getAll = async () => {
  const result = await models.Instructor.findAll({
    include: [
      {
        model: models.User,
        attributes: { exclude: ["password"] },
      },
    ],
  });
  return result;
};

const getInstructorData = async (newInstructor) => {
  const { instructor_name, email, password } = newInstructor;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  return {
    instructor_name,
    user: {
      email,
      password: encryptedPassword,
    },
  };
};

// create new instructor
// argument : {
//   instructor_name
//   email
//   password
// }
// return
//  - Instructor
const create = async (newInstructor) => {
  const instructorData = await getInstructorData(newInstructor);
  const result = await models.Instructor.create(instructorData, {
    include: [models.User],
  });
  return result;
};

module.exports = {
  create,
  getAll,
};
