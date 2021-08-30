const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");

// Route : api/students/

// get all students
const getAllStudents = async (req, res) => {
  try {
    const rawUsers = await services.student.getAll();
    const cleanedUsers = sanitize(rawUsers);
    res.status(200).json(cleanedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllStudents);

module.exports = router;
