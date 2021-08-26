const Course = require("./Course");
const CourseStudent = require("./CourseStudent");
const CourseTag = require("./CourseTag");
const Instructor = require("./Instructor");
const Student = require("./Student");
const Tag = require("./Tag");
const User = require("./User");

// user - student
User.hasOne(Student);
Student.belongsTo(User);

// user - Instructor
User.hasOne(Instructor);
Instructor.belongsTo(User);

// instructor - course
Instructor.hasMany(Course);
Course.belongsTo(Instructor);

// course - student
Student.belongsToMany(Course, { through: CourseStudent });
Course.belongsToMany(Student, { through: CourseStudent });

// course - tag
Tag.belongsToMany(Course, { through: CourseTag });
Course.belongsToMany(Tag, { through: CourseTag });

module.exports = {
  Course,
  CourseStudent,
  CourseTag,
  Instructor,
  Student,
  Tag,
  User,
};
