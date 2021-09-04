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
    course_name: "Strength Training",
    instructor_id: 2,
    course_link: "https://www.youtube.com/embed/0RGd8_DRmzY",
    start: new Date(2021, 8, 1, 19, 0, 0),
    duration: "1 hour",
    active: true,
  },
  {
    course_name: "Weights For Beginners",
    instructor_id: 4,
    course_link: "https://www.youtube.com/embed/U0bhE67HuDY",
    start: new Date(2021, 8, 1, 19, 0, 0),
    duration: "1 hour",
    active: true,
  },
  {
    course_name: "Dumbbell Interval Training",
    instructor_id: 6,
    course_link: "https://www.youtube.com/embed/HhCPmhFYq-s",
    start: new Date(2021, 8, 1, 20, 0, 0),
    duration: "30 mins",
    active: true,
  },
  {
    course_name: "Cardio At Home",
    instructor_id: 3,
    course_link: "https://www.youtube.com/embed/zXK6oXwRr1U",
    start: new Date(2021, 8, 1, 21, 0, 0),
    duration: "30 mins",
    active: true,
  },
  {
    course_name: "Beginner Yoga",
    instructor_id: 7,
    course_link: "https://www.youtube.com/embed/v7AYKMP6rOE",
    start: new Date(2021, 8, 1, 22, 0, 0),
    duration: "30 mins",
    active: true,
  },
  {
    course_name: "Peaceful Pilates",
    instructor_id: 1,
    course_link: "https://www.youtube.com/embed/K56Z12XNQ5c",
    start: new Date(2021, 8, 1, 23, 0, 0),
    duration: "30 mins",
    active: true,
  },
];

const seedCourses = () => models.Course.bulkCreate(data);

module.exports = seedCourses;
