const knex = require("knex")(require("../knexfile"));
const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
  });
};
module.exports = {
  sendEmail,
};
