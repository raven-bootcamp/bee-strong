const models = require("../../models");

const data = [
  {
    instructor_name: "Amiko",
    user_id: 3,
  },
  {
    instructor_name: "Blake",
    user_id: 5,
  },
];

const seedInstructors = () => models.Instructor.bulkCreate(data);

module.exports = seedInstructors;
