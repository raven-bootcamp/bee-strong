const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");

// Route : api/courses/

// get all students
const getAllCourses = async (req, res) => {
  try {
    console.log(req.query);
    const rawCourses = await services.course.getAll(req.query);
    const cleanedCourses = rawCourses.length ? sanitize(rawCourses) : [];
    res.status(200).json(cleanedCourses);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllCourses);

module.exports = router;
