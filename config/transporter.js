require("dotenv").config();

const config = {
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

const defaults = {
  from: '"Honey Queen" <honey@beestrong.com>',
};

module.exports = {
  config,
  defaults,
};
