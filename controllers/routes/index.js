const router = require("express").Router();

const apiRoutes = require("./api");
const testRoutes = require("./testRoutes");

router.use("/", testRoutes);
router.use("/api", apiRoutes);

module.exports = router;
