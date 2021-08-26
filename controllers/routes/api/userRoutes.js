const router = require("express").Router();
const userServices = require("../../services/userServices");
const sanitize = require("../../services/sanitize");

// Route : api/users/

// get all users
const getAllUsers = async (req, res) => {
  try {
    const rawUsers = await userServices.getAll();
    const cleanedUsers = sanitize(rawUsers);
    res.status(200).json(cleanedUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};

// router

router.get("/", getAllUsers);

module.exports = router;
