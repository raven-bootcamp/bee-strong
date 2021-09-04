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
  {
    instructor_name: "Jane",
    user_id: 6,
  },
  {
    instructor_name: "Johnny",
    user_id: 7,
  },
  {
    instructor_name: "Samantha",
    user_id: 8,
  },
  {
    instructor_name: "Clayton",
    user_id: 9,
  },
  {
    instructor_name: "Chen",
    user_id: 10,
  },
];

const seedInstructors = () => models.Instructor.bulkCreate(data);

module.exports = seedInstructors;
