const models = require("../../models");

const data = [
  {
    tag_name: "Yoga",
  },
  {
    tag_name: "Flow",
  },
  {
    tag_name: "Ashtanga",
  },
  {
    tag_name: "Training",
  },
  {
    tag_name: "Strength",
  },
  {
    tag_name: "Cardio",
  },
];

const seedTags = () => models.Tag.bulkCreate(data);

module.exports = seedTags;
