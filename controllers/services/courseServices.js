const models = require("../../models");
const courseTagServices = require("./courseTagServices");
const sanitize = require("./sanitize");
const { filterObjectByKeys } = require("../utils/object");
const acceptedKeys = ["course_name", "active", "instructor_id"];
const assocModels = {
  student_id: { model: models.Student, field: "id" },
  tag_name: { model: models.Tag, field: "tag_name" },
};

// --------------------------------------------------------------------------------------
//   Get All with filter

// create filters to associated models
const getOtherFilters = (rawFilter) => {
  const assocKeys = Object.keys(assocModels);
  const result = assocKeys.reduce((acc, key) => {
    if (key in rawFilter) {
      const filterObj = { [assocModels[key].field]: rawFilter[key] };
      const toInclude = {
        model: assocModels[key].model,
        where: filterObj,
      };
      return [...acc, toInclude];
    }
    return [...acc];
  }, []);
  return result;
};

// filter the courses according to some filters and return ids
// return Array<int>
const getFilteredIds = async (rawFilter) => {
  const courseFilter = filterObjectByKeys(acceptedKeys, rawFilter);
  const otherFilters = getOtherFilters(rawFilter);

  try {
    const courses = await models.Course.findAll({
      attributes: ["id"],
      where: courseFilter,
      include: otherFilters,
    });
    return courses.map(({ id }) => id);
  } catch (err) {
    console.error(err);
  }

  // console.log(courses);
  // return courses.map(({ id }) => id);
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
    const result = await createCourseStudent(courseId, student_id);
    return result;
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
const update = async (updateData, courseId) => {
  await models.Course.update(updateData, { where: { id: courseId } });

  if ("tags" in updateData && updateData.tags.length) {
    await courseTagServices.update(updateData.tags, courseId);
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
