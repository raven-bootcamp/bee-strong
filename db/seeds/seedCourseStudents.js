const models = require("../../models");

const data = [
  {
    student_id: 1,
    course_id: 1,
  },
  {
    student_id: 1,
    course_id: 2,
  },
  {
    student_id: 2,
    course_id: 1,
  },
  {
    student_id: 3,
    course_id: 2,
  },
];

const seedCourseStudents = () => models.CourseStudent.bulkCreate(data);

module.exports = seedCourseStudents;
