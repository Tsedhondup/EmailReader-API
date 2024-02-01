const knex = require("knex")(require("../knexfile"));
const simpleParser = require("mailparser").simpleParser;
const Imap = require("imap");
const fs = require("fs");
// 'dotenv'
require("dotenv").config();

const addEmails = async (emailObject) => {
  knex("emails")
    .insert(emailObject)
    .then(() => {
      console.log("email added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

const fetchEmails = async (companyEmail, applicationId) => {
  // config IMAP
  const imap = new Imap({
    user: process.env.USER_EMAIL,
    password: process.env.APP_PASSWORD, // my app
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
    imap.openBox("INBOX", true, (err, box) => {
      // error
      if (err) throw err;

      // search criteria
      imap.search(
        [
          ["SINCE", "Jan 1, 2024"],
          ["HEADER", "FROM", companyEmail],
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

              // Creating email object
              const emailObject = {
                id_of_company: applicationId,
                email_date: `${parsed.date}`,
                message_id: parsed.headers.get("message-id"),
                subject: parsed.headers.get("subject")
                  ? parsed.headers.get("subject")
                  : "No Subject",
                from: parsed.from.value[0].address,
              };

              // INVOKE addEmails() to add email to database
              addEmails(emailObject);
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
};

const getAllEmails = (req, res) => {
  knex("emails")
    .where({ id_of_company: req.params.applicationId })
    .then((itemsFound) => {
      if (itemsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Item with ID: ${req.params.applicationId} not found` });
      }

      res.status(200).json(itemsFound);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve emails: ${req.params.applicationId}`,
      });
    });
};

const fetchEmailDetail = async (req, res, emailInfo) => {
  const imap = new Imap({
    user: process.env.USER_EMAIL,
    password: process.env.APP_PASSWORD, // my app
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
    imap.openBox("INBOX", true, (err, box) => {
      // error
      if (err) throw err;

      // search criteria
      imap.search(
        [
          ["SINCE", "Jan 1, 2024"],
          ["HEADER", "FROM", emailInfo.from],
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
              // send respond
              res.status(500).json({
                message: `Cannot find the email with id: ${emailInfo.id} `,
              });
              // end IMAP connection
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

              // MATCH EMAIL MESSAGE_ID
              if (
                parsed.headers.get("message-id") === `${emailInfo.message_id}`
              ) {
                const htmldata = await parsed.html; // get html data
                // update email.html file
                await fs.writeFile(
                  "./public/email/email.html",
                  htmldata,
                  (err) => {
                    console.log("done");
                    if (err) {
                      console.log(err);
                    }
                  }
                );

                // to be send as a respond data
                const emailObject = {
                  subject: emailInfo.subject,
                  email_date: emailInfo.date,
                  link_to_email_page: "http://localhost:8080/email/email.html",
                };
                res.status(200).json(emailObject);
              }
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
};

const getEmailDetail = (req, res) => {
  knex("emails")
    .where({ id: req.params.emailId })
    .then((result) => {
      if (result.length === 0) {
        res.status(500).json({
          message: `Cannot find email with id: ${req.params.emailId}`,
        });
      } else {
        fetchEmailDetail(req, res, result[0]);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Unable to retrieve email with id: ${req.params.emailId}`,
      });
    });
};
module.exports = {
  fetchEmails,
  getAllEmails,
  getEmailDetail,
};
