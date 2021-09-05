const router = require("express").Router();
const resultRoutes = require("./resultRoutes");
const withAuth = require("../../utils/auth");
const services = require("../services");
const sanitize = require("../services/sanitize");

// render the homepage
const renderHomePage = async (req, res) => {
  try {
    res.render("homepage", {
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// render login page
const renderLoginPage = async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  try {
    res.render("login", {
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// render sign up page
const renderSignupPage = async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  try {
    res.render("signup", {
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// render student page
const renderStudentPage = async (req, res) => {
  if (!req.session.user.student) {
    res.redirect("/dashboard");
    return;
  }
  const filter = { student_id: req.session.user.student.id };
  const rawCourses = await services.course.getAll(filter);
  const courses = sanitize(rawCourses);
  const ifNosavedCourses = (courses.length=0) ? "Saved workouts" : "No saved workouts";
     
    try {
    res.render("student", {
      loggedIn: req.session.logged_in,
      user: req.session.user,
      courses: courses,
      ifNosavedCourses: ifNosavedCourses,
            
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// render instructor page
const renderInstructorPage = async (req, res) => {
  if (!req.session.user.instructor) {
    res.redirect("/dashboard");
    return;
  }
  const filter = { instructor_id: req.session.user.instructor.id };
  const rawCourses = await services.course.getAll(filter);
  const rawTags = await services.tag.getAll();
  const tags = sanitize(rawTags);
  const courses = sanitize(rawCourses);

  console.log(courses[0]);

  try {
    res.render("instructor", {
      loggedIn: req.session.logged_in,
      user: req.session.user,
      courses: courses,
      tags: tags,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

// redirect user to correct
const redirectToDashboard = async (req, res) => {
  const isStudent = req.session.user.student;
  console.log(isStudent);
  if (isStudent) {
    res.redirect("/student");
  } else {
    res.redirect("/instructor");
  }
};

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);
router.get("/signup", renderSignupPage);
router.get("/student", withAuth, renderStudentPage);
router.get("/instructor", withAuth, renderInstructorPage);
router.get("/dashboard", withAuth, redirectToDashboard);
router.use("/results", withAuth, resultRoutes);

module.exports = router;
