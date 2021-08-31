const user = require("./userServices");
const student = require("./studentServices");
const instructor = require("./instructorServices");
const course = require("./courseServices");
const tag = require("./tagServices");

module.exports = {
  course,
  user,
  student,
  instructor,
  tag,
};
