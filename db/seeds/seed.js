const seedUsers = require("./seedUsers");

const sequelize = require("../../config/connection");

const seedAll = async () => {
  console.log("BEGIN SEEDING....");

  await sequelize.sync({ force: true });
  console.log("\n----- Database Synced -----\n");

  await seedUsers();
  console.log("\n----- Users Seeded -----\n");
};

seedAll();
