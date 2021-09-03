const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");

// Route : api/courses/

// get all courses
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
    res.status(200).json({ message: "Course has been successfully deleted!" });
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
// expect {add : true, student_id: perhaps }
const updateStudent = async (req, res) => {
  const student_id = req.session.user.student.id || req.body.student_id;
  try {
    if (req.body.add) {
      await services.course.addStudent({ student_id }, req.params.id);
      res.status(200).json({ message: "Student has been successfully added" });
    } else {
      await services.course.removeStudent({ student_id }, req.params.id);
      res
        .status(200)
        .json({ message: "Student has been successfully removed" });
    }
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
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/students", getStudentList);
router.post("/:id/students", updateStudent);

module.exports = router;
