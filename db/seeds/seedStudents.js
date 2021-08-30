const models = require("../../models");

const data = [
  {
    student_name: "Sal",
    user_id: 1,
  },
  {
    student_name: "Lernantino",
    user_id: 2,
  },
  {
    student_name: "Jordan",
    user_id: 4,
  },
];

const seedStudents = () => models.Student.bulkCreate(data);

module.exports = seedStudents;
