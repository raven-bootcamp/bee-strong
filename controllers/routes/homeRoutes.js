const router = require("express").Router();

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

router.get("/", renderHomePage);
router.get("/login", renderLoginPage);

module.exports = router;
