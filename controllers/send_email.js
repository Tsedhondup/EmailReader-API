const knex = require("knex")(require("../knexfile"));
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.MY_PS,
    },
  });
  const mailOptions = {
    from: '"Tsering 👻" <tyddhondup88@gmail.com>',
    to: "tdhondup2022@gmail.com",
    subject: "Hello from Nodemailer",
    inReplyTo: "<b73246a7-301e-6b23-660b-bd2f8555d702@gmail.com>",
    text: "Thanks for replying.",
    html: "<b>Thanks for replying.</b>",
  };
};
module.exports = {
  sendEmail,
};
