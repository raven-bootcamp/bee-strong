const models = require("../../models");

// get course tags based on course id
const getCourseTags = async (courseId) => {
  const result = await models.CourseTag.findAll({
    where: { course_id: courseId },
  });
  return result;
};

// check if a tag id is already in an array of courseTags
const isIn = (tagId, courseTags) => {
  const tagIds = courseTags.map(({ tag_id }) => tag_id);
  return tagIds.includes(tagId);
};

// return courseTag ids to be remove
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

// return an array of courseTags to create
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

//----------------------------------------------------------------------------------------
// update course tag
// arguments:
//  - tags: Array<int> of tag ids
//  - courseId : int
const update = async (tags, courseId) => {
  const oldCourseTags = await getCourseTags(courseId);
  const newCourseTags = createNewCourseTags(tags, courseId);
  await removeCourseTags(oldCourseTags, newCourseTags);
  await addCourseTags(oldCourseTags, newCourseTags);
};

module.exports = {
  update,
};
