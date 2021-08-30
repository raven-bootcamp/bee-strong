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
//  get one

// get one full course
// argument: courseId
const getOne = async (courseId) => {
  const result = await models.Course.findOne({
    where: { id: courseId },
    include: [models.Instructor, models.Tag],
  });
  return result;
};

// --------------------------------------------------------------------------------------
//  create

// create new course
// argument: contain at least { course_name, instructor_id }
const create = async (courseData) => {
  const result = await models.Course.create(courseData);
  return result;
};

// --------------------------------------------------------------------------------------
//  remove

// remove a course
// argument: courseId
const remove = async (courseId) => {
  const result = await models.Course.destroy({
    where: { id: courseId },
  });
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  remove,
};
