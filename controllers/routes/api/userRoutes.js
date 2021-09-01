const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");

// Route : api/users/

const saveLogin = (req, res, userData) => {
  req.session.save(() => {
    req.session.user = userData;
    req.session.logged_in = true;

    res.json({ user: userData, message: "You are now logged in!" });
  });
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const rawUsers = await services.user.getAll();
    const cleanedUsers = sanitize(rawUsers);
    res.status(200).json(cleanedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// log a user in
const logUserIn = async (req, res) => {
  try {
    const userData = await services.user.authenticate(req.body);
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
    }
    saveLogin(req, res, userData);
  } catch (err) {
    res.status(400).json(err);
  }
};

// log a user out
const logUserOut = (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
};

// get a single user
const getOne = async (req, res) => {
  try {
    const rawUserData = await services.user.getOne(req.params);
    const cleaned = sanitize(rawUserData);
    res.status(200).json(cleaned);
  } catch (err) {
    res.status(404).json(err);
  }
};

// router

router.get("/", getAllUsers);
router.post("/login", logUserIn);
router.post("/logout", logUserOut);
router.get("/:id", getOne);

module.exports = router;
