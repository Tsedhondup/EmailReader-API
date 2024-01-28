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
const companyRoute = require("./routes/companies_routes");
const emailRoute = require("./routes/emails_routes");
const interviewRoute = require("./routes/interviews_routes");

app.get("/profile", profileRoute);
app.get("/allEmails/:companyId", emailRoute);
app.get("/allInterviews", interviewRoute);

app.post("/profile", profileRoute);
app.post("/addCompany", companyRoute);
app.post("/addInterviews", interviewRoute)
// start Express server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
