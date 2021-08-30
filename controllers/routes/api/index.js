const router = require("express").Router();
const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");

// Route : api/

router.use("/users", userRoutes);
router.use("/students", studentRoutes);

module.exports = router;
