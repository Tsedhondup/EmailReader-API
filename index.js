const express = require("express");
const cors = require("cors");

const app = express();
// 'dotenv'
require("dotenv").config();
// JSON PARSER
app.use(express.json());
// STATIC FILE
app.use(express.static("public"));
// PORT
const port = process.env.PORT || 8000;
// CORS
app.use(cors({ origin: 3000 }));

// ROUTES
const profileRoute = require("./routes/profiles_routes");
const applicationRoute = require("./routes/application_routes");
const emailRoute = require("./routes/emails_routes");
const interviewRoute = require("./routes/interviews_routes");

app.get("/profile", profileRoute);
app.get("/getAllApplications", applicationRoute);
app.get("/allEmails/:companyId", emailRoute);
app.get("/allInterviews", interviewRoute);
app.get("/emailDetail/:emailId", emailRoute);

app.post("/profile", profileRoute);
app.post("/addApplication", applicationRoute);
app.post("/addInterviews", interviewRoute);
// start Express server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
