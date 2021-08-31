const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");

// Route : api/courses/

// get all course
const getAllCourses = async (req, res) => {
  try {
    const rawCourses = await services.course.getAll(req.query);
    const cleanedCourses = rawCourses.length ? sanitize(rawCourses) : [];
    res.status(200).json(cleanedCourses);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create new course
const createNewCourse = async (req, res) => {
  try {
    const rawCourse = await services.course.create(req.body);
    const cleanedCourse = sanitize(rawCourse);
    res.status(200).json(cleanedCourse);
  } catch (err) {
    res.status(400).json(err);
  }
};

// create a single course
const getFullCourse = async (req, res) => {
  try {
    const rawCourse = await services.course.getOne(req.params.id);
    const cleanedCourse = sanitize(rawCourse);
    res.status(200).json(cleanedCourse);
  } catch (err) {
    res.status(500).json(err);
  }
};

// delete a course
const deleteCourse = async (req, res) => {
  try {
    await services.course.remove(req.params.id);
    res.status(200).json({ message: "deleting course is successful!" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// get student list
const getStudentList = async (req, res) => {
  try {
    const rawStudents = await services.course.getStudents(req.params.id);
    const cleanedStudents = sanitize(rawStudents);
    res.status(200).json(cleanedStudents);
  } catch (err) {
    res.status(500).json(err);
  }
};

// add or remove student from course
const updateStudent = async (req, res) => {
  try {
    console.log("course routes: ", req.body);

    if (req.body.add) {
      await services.course.addStudent(req.body, req.params.id);
      res.status(200).json({ message: "Student has been successfully added" });
    }
    await services.course.removeStudent(req.body, req.params.id);
    res.status(200).json({ message: "Student has been successfully removed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// create new course
const updateCourse = async (req, res) => {
  try {
    const rawCourse = await services.course.update(req.body, req.params.id);
    const cleanedCourse = sanitize(rawCourse);
    res.status(200).json(cleanedCourse);
  } catch (err) {
    res.status(400).json(err);
  }
};

// router

router.get("/", getAllCourses);
router.post("/create", createNewCourse);
router.get("/:id", getFullCourse);
router.post("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/students", getStudentList);
router.post("/:id/students", updateStudent);

module.exports = router;
