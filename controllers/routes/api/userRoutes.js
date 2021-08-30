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
const loginUser = async (req, res) => {
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

// router

router.get("/", getAllUsers);
router.post("/login", loginUser);

module.exports = router;
