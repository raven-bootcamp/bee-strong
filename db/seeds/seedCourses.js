const models = require("../../models");

const data = [
  {
    course_name: "Yoga with Amiko",
    instructor_id: 1,
    course_link: "https://www.youtube.com/embed/7RF_PlrLb1g",
    start: new Date(2021, 8, 1, 18, 0, 0),
    duration: "1 hour",
    active: false,
  },
  {
    course_name: "Strength Training With Blake",
    instructor_id: 2,
    course_link: "https://www.youtube.com/embed/0RGd8_DRmzY",
    start: new Date(2021, 8, 1, 19, 0, 0),
    duration: "1 hour",
    active: true,
  },
];

const seedCourses = () => models.Course.bulkCreate(data);

module.exports = seedCourses;
