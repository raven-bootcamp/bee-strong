const { Op } = require("sequelize");
const models = require("../../models");
const sanitize = require("./sanitize");
const { filterObjectByKeys } = require("../utils/object");
const acceptedKeys = ["course_name", "active", "instructor_id"];

// --------------------------------------------------------------------------------------
//   Get All with filter

// filter the courses according to some filters and return ids
// return Array<int>
const getFilteredIds = async (rawFilter) => {
  const courseFilter = filterObjectByKeys(acceptedKeys, rawFilter);
  const studentFilter = rawFilter.student_id
    ? { id: rawFilter.student_id }
    : {};
  const tagFilter = rawFilter.tag_name ? { tag_name: rawFilter.tag_name } : {};

  const courses = await models.Course.findAll({
    attributes: ["id"],
    where: courseFilter,
    include: [
      {
        model: models.Instructor,
      },
      {
        model: models.Student,
        where: studentFilter,
      },
      {
        model: models.Tag,
        where: tagFilter,
      },
    ],
  });
  return courses.map(({ id }) => id);
};

// get all courses filtered by filter
const getAll = async (rawFilter) => {
  const ids = await getFilteredIds(rawFilter);
  const result = await models.Course.findAll({
    where: { id: ids },
    include: [models.Instructor, models.Tag],
  });
  return result;
};

// --------------------------------------------------------------------------------------
// get one full course
// argument: courseId
const getOne = async (courseId) => {
  const result = await models.Course.findOne({
    where: { id: courseId },
    include: [models.Instructor, models.Tag, models.Student],
  });
  return result;
};

// --------------------------------------------------------------------------------------
// create new course
// argument: contain at least { course_name, instructor_id }
const create = async (courseData) => {
  const result = await models.Course.create(courseData);
  return result;
};

// --------------------------------------------------------------------------------------
// get students enrolled in the course
// argument: courseId
const getStudents = async (courseId) => {
  const result = await models.Course.findOne({
    where: { id: courseId },
    include: [models.Student],
  });
  return result.students;
};

// --------------------------------------------------------------------------------------
// remove a course
// argument: courseId
const remove = async (courseId) => {
  const result = await models.Course.destroy({
    where: { id: courseId },
  });
  return result;
};

// --------------------------------------------------------------------------------------
// add student to a course
// argument:
//  - student: { student_id}
//  - courseId

const getCourseStudents = async (courseId) => {
  const result = await models.CourseStudent.findAll({
    where: { courseId: courseId },
  });
  return result;
};

const createCourseStudent = async (course_id, student_id) => {
  const newCourseStudent = { course_id, student_id };
  const result = await models.CourseStudent.create(newCourseStudent);
  return result;
};

const addStudent = async (student, courseId) => {
  const { student_id } = student;
  const courseStudents = await getCourseStudents(courseId);
  const studentIds = courseStudents.map(({ studentId }) => studentId);

  if (!studentIds.includes(student_id)) {
    return await createCourseStudent(courseId, student_id);
  }
  return;
};

// --------------------------------------------------------------------------------------
// remove student from a course
// argument:
//  - student: { student_id}
//  - courseId
const removeStudent = async (student, courseId) => {};

module.exports = {
  create,
  getAll,
  getOne,
  getStudents,
  remove,
  addStudent,
  removeStudent,
};
