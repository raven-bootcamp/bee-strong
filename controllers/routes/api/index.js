const router = require("express").Router();
const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");
const instructorRoutes = require("./instructorRoutes");

// Route : api/

router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/instructors", instructorRoutes);

module.exports = router;
