const knex = require("knex")(require("../knexfile"));
const nodemailer = require("nodemailer");
const simpleParser = require("mailparser").simpleParser;
const Imap = require("imap");
const fs = require("fs");
require("dotenv").config();

const sendEmail = async (req, res) => { 
  await fs.readFile("./session/session.json", (err, data) => {
    const parsedData = JSON.parse(data);
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: parsedData.email,
        pass: parsedData.password,
      },
    });
    // email structure
    const mailOptions = {
      from: `${parsedData.email}`,
      to: req.body.to_email,
      subject: req.body.subject ? req.body.subject : "follow up",
      inReplyTo: req.body.reply_to ? req.body.to_email : "",
      text: `${req.body.email_text}`,
      html: `${req.body.email_html}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ message: "Cannot send email" });
      } else {
        res.status(201).json({ message: "Email successfully sent!" });

        // console.log("Email sent: ", info);
        // CREATE EMAIL OBJECT
        const email_object = {
          application_id: req.body.application_id,
          from: parsedData.email,
          to: req.body.to_email,
          reply_to: req.body.reply_to ? req.body.to_email : "no follow up",
          subject: req.body.subject ? req.body.subject : "follow up",
          message_id: info.messageId,
          email_date: info.messageTime,
          email_body_style: "style", // to be change later
          email_body_html: req.body.email_html, // to be change later
        };

        // INSERT INTO DATA BASE
        // knex("sent_emails")
        //   .insert(email_object)
        //   .then((result) => {
        //     return knex("sent_emails").where({ id: result[0] });
        //   })
        //   .then((sentEmail) => {
        //     res.status(201).json(sentEmail);
        //   })
        //   .catch(() => {
        //     res
        //       .status(500)
        //       .json({ message: "unable to insert email into database" });
        //   });
      }
    });
  });
};
// const getSentEmails = async (req, res) => {
//   knex("sent_emails")
//     .then((sent_emails) => {
//       res.status(200).json({ sent_emails });
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "Sent emails not found" });
//     });
// };
module.exports = {
  sendEmail,
  // getSentEmails,
};
