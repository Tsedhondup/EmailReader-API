const express = require("express");
const Imap = require("imap");
const simpleParser = require("mailparser").simpleParser;
const app = express();
// 'dotenv'
require("dotenv").config();
// JSON PARSER
app.use(express.json());

// PORT
const port = process.env.PORT || 8000;
// ROUTES
const profileRoute = require("./routes/profiles_routes");
// Configure IMAP connection
// const imap = new Imap({
//   user: process.env.USER_EMAIL,
//   password: process.env.APP_PASSWORD, // my app
//   host: "imap.gmail.com",
//   port: 993,
//   authTimeout: 10000,
//   tls: true,
//   tlsOptions: { rejectUnauthorized: false },
// });

// // when IMAP connection is ready
// imap.once("ready", () => {
//   console.log("connection successful");

//   // open email-box
//   imap.openBox("INBOX", true, (err, box) => {
//     // reading unread email
//     // error
//     if (err) throw err;

//     // reading file unseen file since Jan 20 2024
//     // imap.search(["UNSEEN", ["SINCE", "Jan 20, 2024"]], function (err, results) {
//     imap.search([["SINCE", "Jan 23, 2024"]], function (err, results) {
//       if (err) throw err;

//       // fetching results
//       var f = imap.fetch(results, { bodies: "" });
//       // once app starts recieving email
//       f.on("message", function (msg, seqno) {
//         // once app have the message body
//         msg.on("body", async function (stream, info) {
//           // parse messsage data using Nodemailer simple parser
//           let parsed = await simpleParser(stream);
//           if (parsed.from.value[0].address === "newsletter@canadavisa.com") {
//             // print name of the sender
//             console.log(parsed.from.value[0].name);
//           }
//         });
//       });

//       // if there is error fetching message/email
//       f.once("error", function (err) {
//         console.log("Fetch error: " + err);
//       });

//       // once the fetching message/email is completed
//       f.once("end", function () {
//         console.log("Done fetching all messages!");
//         imap.end();
//       });
//     });
//   });
// });

// // when IMAP connection failed
// imap.once("error", function (err) {
//   console.log(err);
// });

// // when IMAP connection was ended
// imap.once("end", function () {
//   console.log("Connection ended");
// });

// // Establishing IMAP connection
// imap.connect();

// test route
app.get("/profile", profileRoute);
app.post("/profile", profileRoute);
// start Express server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
