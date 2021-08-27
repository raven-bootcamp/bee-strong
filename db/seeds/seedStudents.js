const models = require("../../models");

const data = [
  {
    student_name: "Sal",
    id: 1,
  },
  {
    student_name: "Lernantino",
    id: 2,
  },
  {
    student_name: "Jordan",
    id: 4,
  },
];

const seedStudents = () => models.Student.bulkCreate(data);

module.exports = seedStudents;
