const router = require("express").Router();
const services = require("../../services");
const sanitize = require("../../services/sanitize");
const { route } = require("./courseRoutes");

// Route : api/tags/

// get all tags
const getAlltags = async (req, res) => {
  try {
    const rawtags = await services.tag.getAll();
    const cleanedtags = rawtags.length ? sanitize(rawtags) : [];
    res.status(200).json(cleanedtags);
  } catch (err) {
    res.status(500).json(err);
  }
};

router.get("/", getAlltags);

module.exports = router;
