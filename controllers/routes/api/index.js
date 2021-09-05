const router = require("express").Router();
const userRoutes = require("./userRoutes");
const studentRoutes = require("./studentRoutes");
const instructorRoutes = require("./instructorRoutes");
const courseRoutes = require("./courseRoutes");
const tagRoutes = require("./tagRoutes");
const seedRoutes = require("./seedRoutes");

// Route : api/

router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/instructors", instructorRoutes);
router.use("/courses", courseRoutes);
router.use("/tags", tagRoutes);
router.use("/seeds", seedRoutes);

module.exports = router;
