const router = require("express").Router();
const services = require("../services");
const sanitize = require("../services/sanitize");

// get all courses filtered by filter
const getCourses = async (filter) => {
  // if there is nothing return no course
  if (!Object.keys(filter).length) return [];
  const result = await services.course.getAll(filter);
  return result;
};

// render student page
const renderResultPage = async (req, res) => {
  // must be student
  if (!req.session.user.student) {
    res.redirect("/dashboard");
    return;
  }
  try {
    const rawCourses = await getCourses(req.query);
    const rawTags = await services.tag.getAll();
    const tags = sanitize(rawTags);
    const courses = sanitize(rawCourses);

    console.log("\nresult route: ", courses);

    res.render("results", {
      loggedIn: req.session.logged_in,
      user: req.session.user,
      tags: tags,
      courses: courses,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

router.get("/", renderResultPage);

module.exports = router;
