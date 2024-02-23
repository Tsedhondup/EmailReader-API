const express = require("express");
const cors = require("cors");
const fs = require("fs");
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
const loginRoute = require("./routes/login_route");
const signUpRoute = require("./routes/sign_up_routes");
const logOutRoute = require("./routes/log_out_routes");

// THIS ROUTE DOES NOT AUTHENTICATION
app.post("/login", loginRoute);
app.post("/signUp", signUpRoute);
app.post("./logOut", logOutRoute);

// AUTHENTICATING MIDDLEWARE
app.use(async (req, res, next) => {
  await fs.readFile("./session/session.json", async (err, data) => {
    const parsedData = JSON.parse(data);
    if (parsedData.id !== req.headers.session_id) {
      res.status(500).json({ message: "Authentication error" });
    }
    next();
  });
});
app.get("/profile/:id", profileRoute);
app.get("/getAllApplications/:id", applicationRoute);
app.get("/getApplicationDetails/:id", applicationRoute);
app.get("/allEmails/:applicationId", emailRoute);
app.get("/allInterviews/:id", interviewRoute);
app.get("/emailDetail/:emailId", emailRoute);
app.get("/getNewEmails", emailRoute);

app.post("/profile", profileRoute);
app.post("/addApplication", applicationRoute);
app.post("/addInterviews", interviewRoute);
// start Express server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
