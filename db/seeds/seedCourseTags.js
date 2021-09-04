const models = require("../../models");

const data = [
  {
    tag_id: 1,
    course_id: 1,
  },
  {
    tag_id: 3,
    course_id: 2,
  },
  {
    tag_id: 2,
    course_id: 3,
  },
  {
    tag_id: 3,
    course_id: 3,
  },
  {
    tag_id: 3,
    course_id: 4,
  },
  {
    tag_id: 4,
    course_id: 4,
  },
  {
    tag_id: 4,
    course_id: 5,
  },
  {
    tag_id: 6,
    course_id: 5,
  },
  {
    tag_id: 2,
    course_id: 6,
  },
  {
    tag_id: 1,
    course_id: 6,
  },
  {
    tag_id: 5,
    course_id: 7,
  },
];

const seedCourseTags = () => models.CourseTag.bulkCreate(data);

module.exports = seedCourseTags;
