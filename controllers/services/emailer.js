"use strict";
const nodemailer = require("nodemailer");
const { config, defaults } = require("../../config/transporter");

// send mail with defined transport object
// argument:
//  - message: object
//    - from: '"Fred Foo 👻" <foo@example.com>', // sender address
//    - to: "bar@example.com, baz@example.com", // list of receivers
//    - subject: "Hello ✔", // Subject line
//    - text: "Hello world?", // plain text body
//    - html: "<b>Hello world?</b>"
//

const sendMail = async (message) => {
  try {
    // need to connect to a SMTP server separately for every single message
    const transporter = nodemailer.createTransport(config, defaults);
    const info = await transporter.sendMail(message);

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  sendMail,
};
