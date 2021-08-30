const models = require("../../models");

// password for all these are 'password' using saltround = 10
const data = [
  {
    email: "sal@hotmail.com",
    password: "$2b$10$wxKAh5pQNR1EoCRPdjfTeeCYIG7Wei6.hXweYCZ2WkVScLpufkuWy",
  },
  {
    email: "lernantino@gmail.com",
    password: "$2b$10$wxKAh5pQNR1EoCRPdjfTeeCYIG7Wei6.hXweYCZ2WkVScLpufkuWy",
  },
  {
    email: "amiko2k20@aol.com",
    password: "$2b$10$wxKAh5pQNR1EoCRPdjfTeeCYIG7Wei6.hXweYCZ2WkVScLpufkuWy",
  },
  {
    email: "jordan99@msn.com",
    password: "$2b$10$wxKAh5pQNR1EoCRPdjfTeeCYIG7Wei6.hXweYCZ2WkVScLpufkuWy",
  },
  {
    email: "the_blake@yahoo.com",
    password: "$2b$10$wxKAh5pQNR1EoCRPdjfTeeCYIG7Wei6.hXweYCZ2WkVScLpufkuWy",
  },
];

const seedUsers = () => models.User.bulkCreate(data);

module.exports = seedUsers;
