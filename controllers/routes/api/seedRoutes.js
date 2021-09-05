const router = require("express").Router();
const seedAll = require("../../../db/seeds/webSeed");

router.get("/", async (req, res) => {
  try {
    await seedAll();
    res.status(200).json({ maessge: "seeding successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
