const router = require("express").Router();
const services = require("../../services");
const emailer = require("../../services/emailer");
const message = require("../../services/message");
const sanitize = require("../../services/sanitize");

// Route : api/instructors/

// get all students
const getAllInstructors = async (req, res) => {
  try {
    const rawUsers = await services.instructor.getAll();
    const cleanedUsers = sanitize(rawUsers);
    res.status(200).json(cleanedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// create student account
const createAccount = async (req, res) => {
  try {
    const rawInstructor = await services.instructor.create(req.body);
    const cleanedInstructor = sanitize(rawInstructor);
    const messageObj = message.getWelcome(cleanedInstructor.user.email);
    emailer.sendMail(messageObj);
    res.status(200).json(cleanedInstructor);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllInstructors);
router.post("/signup", createAccount);

module.exports = router;
