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
        // user: process.env.MY_EMAIL,
        // pass: process.env.MY_PS,
        user: parsedData.email,
        password: parsedData.password,
      },
    });

    const mailOptions = {
      // from: '"Tsering 👻" <tyddhondup88@gmail.com>',
      from: `${parsedData.email}`,
      to: req.body.to_email,
      subject: req.body.subject ? req.body.subject : "follow up",
      inReplyTo: req.body.reply_to ? req.body.to_email : "",
      text: `${req.body.email_text}`,
      html: `<b>${req.body.email_html}</b>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Cannot send email" });
      } else {
        console.log("Email sent: ", info);
        // CREATE EMAIL OBJECT
        const email_object = {
          application_id: req.body.application_id,
          from: parsedData.email,
          to: req.body.to_email,
          reply_to: req.body.to_email ? req.body.to_email : "no follow up",
          subject: req.body.subject ? req.body.subject : "follow up",
          message_id: info.messageId,
          email_date: info.date,
          email_body_style: "style", // to be change later
          email_body_html: req.body.email_html, // to be change later
        };
        // INSERT INTO DATA BASE
        knex("sent_emails")
          .insert(email_object)
          .then((sent_email) => {
            res.status(201).json(sent_email);
          })
          .catch(() => {
            res
              .status(500)
              .json({ message: "unable to insert email into database" });
          });
      }
    });
  });
};
const getSentEmails = async (req, res) => {
  await fs.readFile("./session/session.json", (err, data) => {
    const parsedData = JSON.parse(data); // config IMAP
    const imap = new Imap({
      user: process.env.MY_EMAIL,
      password: process.env.MY_PS, // my app
      // user: parsedData.email,
      // password: parsedData.password, // my app
      host: "imap.gmail.com",
      port: 993,
      authTimeout: 10000,
      tls: true,
      tlsOptions: { rejectUnauthorized: false },
    });

    // when IMAP connection is ready
    imap.once("ready", () => {
      console.log("connection successful");
      // open email-box
      imap.openBox("SENT", true, (err, box) => {
        // error
        if (err) throw err;

        // search criteria
        imap.search(
          [
            ["SINCE", "Jan 1, 2024"],
            ["HEADER", "TO", "tdhondup2022@gmail.com"],
          ],
          function (err, results) {
            if (err) throw err;

            // STORE MESSAGE BODY IN VARIABLE 'f'
            let f;
            // IF NO EMAIL IS RECIEVE THE ABORT THE CONNECTION AND EXIT FUNCTIONS
            try {
              f = imap.fetch(results, { bodies: "" });
            } catch (err) {
              if (err) {
                console.log(err);
                imap.end();
                return;
              }
            }
            // once app starts recieving email
            f.on("message", function (msg, seqno) {
              // once app have the message body
              msg.on("body", async function (stream, info) {
                // parse messsage data using Nodemailer simple parser
                let parsed = await simpleParser(stream);
                console.log(parsed);

                // Creating email object
                // const emailObject = {
                //   application_id: applicationId,
                //   email_date: `${parsed.date}`,
                //   message_id: parsed.headers.get("message-id"),
                //   subject: parsed.headers.get("subject")
                //     ? parsed.headers.get("subject")
                //     : "No Subject",
                //   from: parsed.from.value[0].address,
                // };

                // INVOKE addEmails() to add email to database
                // addEmails(emailObject);
              });
            });

            // if there is error fetching message/email
            f.once("error", function (err) {
              console.log("Fetch error: " + err);
            });

            // once the fetching message/email is completed
            f.once("end", function () {
              console.log("Done fetching all messages!");
              imap.end();
            });
          }
        );
      });
    });

    // when IMAP connection failed
    imap.once("error", function (err) {
      console.log(err);
    });

    // when IMAP connection was ended
    imap.once("end", function () {
      console.log("Connection ended");
    });

    // Establishing IMAP connection
    imap.connect();
  });
};
module.exports = {
  sendEmail,
  getSentEmails,
};
