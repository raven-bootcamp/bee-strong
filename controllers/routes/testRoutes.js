const router = require("express").Router();

const renderHomePage = async (req, res) => {
  // if (req.session.logged_in) {
  //   res.redirect('/purpose');
  //   return;
  // }
  try {
    res.render("homepage", {
      // loggedIn: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

router.get("/", renderHomePage);

module.exports = router;
