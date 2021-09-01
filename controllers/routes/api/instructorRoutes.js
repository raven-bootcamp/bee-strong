const router = require("express").Router();
const services = require("../../services");
const emailer = require("../../services/emailer");
const message = require("../../services/message");
const sanitize = require("../../services/sanitize");

// Route : api/instructors/

// save login into express session
const saveLogin = (req, res, userData) => {
  req.session.save(() => {
    req.session.user = userData;
    req.session.logged_in = true;

    res.json({ user: userData, message: "You are now logged in!" });
  });
};

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
    const messageObj = message.getWelcome(rawInstructor.user.email);
    emailer.sendMail(messageObj);
    const rawUser = await services.user.getOne(rawInstructor.user.id);
    const cleanedUser = sanitize(rawUser);
    saveLogin(req, res, cleanedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllInstructors);
router.post("/signup", createAccount);

module.exports = router;
