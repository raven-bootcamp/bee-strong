const models = require("../../models");

const data = [
  {
    instructor_name: "Amiko",
    id: 3,
  },
  {
    instructor_name: "Blake",
    id: 5,
  },
];

const seedInstructors = () => models.Instructor.bulkCreate(data);

module.exports = seedInstructors;
