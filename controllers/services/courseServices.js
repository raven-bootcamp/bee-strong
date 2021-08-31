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
//  - student: { student_id }
//  - courseId

const removeCourseStudent = async (course_id, student_id) => {
  const condition = { course_id, student_id };
  const result = await models.CourseStudent.destroy({ where: condition });
  return result;
};

const removeStudent = async (student, courseId) => {
  const { student_id } = student;
  const courseStudents = await getCourseStudents(courseId);
  const studentIds = courseStudents.map(({ studentId }) => studentId);

  if (studentIds.includes(student_id)) {
    return await removeCourseStudent(courseId, student_id);
  }
  return;
};

// --------------------------------------------------------------------------------------
// update course
// argument:
//  - object containing some of these {
//    - course_name
//    - instructor_id
//    - course_link
//    - start
//    - duration
//    - active
//    - tags: Array<tag_id> - assumed to be all the tags that this course has
//  - courseId

const getCourseTags = async (courseId) => {
  const result = await models.CourseTag.findAll({
    where: { course_id: courseId },
  });
  return result;
};

const isIn = (tagId, courseTags) => {
  const tagIds = courseTags.map(({ tag_id }) => tag_id);
  return tagIds.includes(tagId);
};

const getCourseTagIdsToRemove = (oldCourseTags, newCourseTags) => {
  const toRemove = oldCourseTags.filter(({ tag_id }) => {
    const entry = isIn(tag_id, newCourseTags);
    return entry ? false : true; // remove one not in tags
  });
  const result = toRemove.map(({ id }) => id);
  return result;
};

// remove old course tags not in the new one
const removeCourseTags = async (oldCourseTags, newCourseTags) => {
  const idsToRemove = getCourseTagIdsToRemove(oldCourseTags, newCourseTags);
  const result = await models.CourseTag.destroy({ where: { id: idsToRemove } });
  return result;
};

// create new course tags data
const createNewCourseTags = (tags, courseId) => {
  const result = tags.map((tag) => {
    return { tag_id: tag, course_id: courseId };
  });
  return result;
};

const getCourseTagsToCreate = (oldCourseTags, newCourseTags) => {
  const result = newCourseTags.filter(({ tag_id }) => {
    const entry = isIn(tag_id, oldCourseTags);
    return entry ? false : true; // add one not in the old ones
  });
  return result;
};

// add new course tags not in the old one
const addCourseTags = async (oldCourseTags, newCourseTags) => {
  const toCreate = getCourseTagsToCreate(oldCourseTags, newCourseTags);
  const result = await models.CourseTag.bulkCreate(toCreate);
  return result;
};

// update course tag
const updateCourseTags = async (tags, courseId) => {
  const oldCourseTags = await getCourseTags(courseId);
  const newCourseTags = createNewCourseTags(tags, courseId);

  console.log("\ncourse services: ", newCourseTags);

  await removeCourseTags(oldCourseTags, newCourseTags);
  await addCourseTags(oldCourseTags, newCourseTags);
};

// combine everything together
const update = async (updateData, courseId) => {
  await models.Course.update(updateData, { where: { id: courseId } });

  if ("tags" in updateData && updateData.tags.length) {
    console.log("\ncourse services:  update course tags\n");

    await updateCourseTags(updateData.tags, courseId);
  }
  const result = await getOne(courseId);
  return result;
};

module.exports = {
  create,
  getAll,
  getOne,
  getStudents,
  remove,
  addStudent,
  removeStudent,
  update,
};
