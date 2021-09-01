const router = require("express").Router();
const services = require("../../services");
const emailer = require("../../services/emailer");
const message = require("../../services/message");
const sanitize = require("../../services/sanitize");

// Route : api/students/

// save login into express session
const saveLogin = (req, res, userData) => {
  req.session.save(() => {
    req.session.user = userData;
    req.session.logged_in = true;

    res.json({ user: userData, message: "You are now logged in!" });
  });
};

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

// create student account
const createAccount = async (req, res) => {
  try {
    const rawStudent = await services.student.create(req.body);
    const messageObj = message.getWelcome(rawStudent.user.email);
    emailer.sendMail(messageObj);
    const rawUser = await services.user.getOne(rawStudent.user.id);
    const cleanedUser = sanitize(rawUser);
    saveLogin(req, res, cleanedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllStudents);
router.post("/signup", createAccount);

module.exports = router;
