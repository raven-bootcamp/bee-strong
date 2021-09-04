const models = require("../../models");

const data = [
  {
    tag_name: "Yoga",
  },
  {
    tag_name: "Beginner",
  },
  {
    tag_name: "Strength",
  },
  {
    tag_name: "Interval",
  },
  {
    tag_name: "Pilates",
  },
  {
    tag_name: "Cardio",
  },
];

const seedTags = () => models.Tag.bulkCreate(data);

module.exports = seedTags;
