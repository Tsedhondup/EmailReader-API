const knex = require("knex")(require("../knexfile"));
const nodemailer = require("nodemailer");
const simpleParser = require("mailparser").simpleParser;
const Imap = require("imap");
const fs = require("fs");
require("dotenv").config();

const sendEmail = (req, res) => {
  // const transporter = nodemailer.createTransport({
  //   service: "Gmail",
  //   host: "smtp.gmail.com",
  //   port: 465,
  //   secure: true, // Use `true` for port 465, `false` for all other ports
  //   auth: {
  //     user: process.env.MY_EMAIL,
  //     pass: process.env.MY_PS,
  //   },
  // });
  // const mailOptions = {
  //   from: '"Tsering 👻" <tyddhondup88@gmail.com>',
  //   to: "tdhondup2022@gmail.com",
  //   subject: "Hello from Nodemailer",
  //   inReplyTo: "<b73246a7-301e-6b23-660b-bd2f8555d702@gmail.com>",
  //   text: `${req.body.message}`,
  //   html: `<b>${req.body.message}</b>`,
  // };

  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     console.error("Error sending email: ", error);
  //   } else {
  //     console.log("Email sent: ", info);
  //     res.status(200).json({ messge: "email sent successfully" });
  //   }
  // });
  getSentEmails(req, res);
  const success = "OK";
  res.status(200).json({ success });
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
