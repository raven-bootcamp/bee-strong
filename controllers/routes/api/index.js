const router = require("express").Router();
const userRoutes = require("./userRoutes");

// Route : api/

router.use("/users", userRoutes);

module.exports = router;
