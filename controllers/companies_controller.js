const knex = require("knex")(require("../knexfile"));
const simpleParser = require("mailparser").simpleParser;
const Imap = require("imap");

// add email to databases
const addEmails = async (companyEmail) => {
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
          ["SINCE", "Jan 24, 2024"],
          ["HEADER", "FROM", companyEmail],
        ],
        function (err, results) {
          if (err) throw err;

          // fetching results
          var f = imap.fetch(results, { bodies: "" });
          // once app starts recieving email
          f.on("message", function (msg, seqno) {
            // once app have the message body
            msg.on("body", async function (stream, info) {
              // parse messsage data using Nodemailer simple parser
              let parsed = await simpleParser(stream);
              console.log(`Email was recieve on ${parsed.date}`);
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

const addCompany = (req, res) => {
  knex("companies")
    .insert(req.body)
    .then((result) => {
      // get the added company
      return knex("companies").where({ id: result[0] });
    })
    .then((newCompany) => {
      // invoke addEmails function
      addEmails(newCompany[0].company_email);
      return newCompany;
    })
    .then((newCompany) => {
      // get and send newAdded company
      res.status(201).send(newCompany);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add job application!" });
    });
};

module.exports = {
  addCompany,
};
