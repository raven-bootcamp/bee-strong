const seedCourses = require("./seedCourses");
const seedCourseStudents = require("./seedCourseStudents");
const seedCourseTags = require("./seedCourseTags");
const seedInstructors = require("./seedInstructors");
const seedStudents = require("./seedStudents");
const seedTags = require("./seedTags");
const seedUsers = require("./seedUsers");

const sequelize = require("../../config/connection");

const seedAll = async () => {
  console.log("BEGIN SEEDING....");

  await sequelize.sync({ force: true });
  console.log("\n----- Database Synced -----\n");

  await seedUsers();
  console.log("\n----- Users Seeded -----\n");

  await seedTags();
  console.log("\n----- Tags Seeded -----\n");

  await seedStudents();
  console.log("\n----- Students Seeded -----\n");

  await seedInstructors();
  console.log("\n----- Instructors Seeded -----\n");

  await seedCourses();
  console.log("\n----- Courses Seeded -----\n");

  await seedCourseStudents();
  console.log("\n----- CourseStudents Seeded -----\n");

  await seedCourseTags();
  console.log("\n----- CourseTags Seeded -----\n");
};

seedAll();
