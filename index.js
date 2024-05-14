const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const jwt = require("jsonwebtoken");

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
const sendEmail = require("./routes/send_email_routes");
const { error } = require("console");

// THIS ROUTE DOES NOT AUTHENTICATION
app.post("/login", loginRoute);
app.post("/signUp", signUpRoute);
app.post("/logOut", logOutRoute);

// AUTHORIZATION MIDDLEWARE
app.use((req, res, next) => {
  // PUBLIC URL THAT DO NOT REQUIRE A TOKEN
  if (req.url === "/signup" || req.url === "/login" || req.url === "/logOut") {
    next();
  } else {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1]; // GET TOKEN
    }
    // IF NO TOKEN IS PROVIDED
    if (!token) {
      res.status(500).json({ error: "No token. Unauthorized." });
    }
    // IF TOKEN IS PROVIDED
    const jwtKey = process.env.JWT_KEY; // JWT_KEY
    jwt.verify(token, jwtKey, (error, decoded) => {
      if (error) {
        console.log(error);
        res.status(500).json({ message: "Not Authorized.", success: "false" });
      } else {
        next();
      }
    });
  }
});
app.get("/profile/:id", profileRoute);
app.get("/getAllApplications/:id", applicationRoute);
app.get("/getApplicationDetails/:id", applicationRoute);
app.get("/allEmails/:applicationId", emailRoute);
app.get("/allInterviews/:id", interviewRoute);
app.get("/emailDetail/:emailId", emailRoute);
app.get("/getNewEmails", emailRoute);
// app.get("/getSendEmails", sendEmail);

app.post("/profile", profileRoute);
app.post("/addApplication", applicationRoute);
app.post("/addInterviews", interviewRoute);
app.post("/sendEmail", sendEmail);

app.patch("/updateApplication/:id", applicationRoute);
app.patch("/updateInterview/:id", interviewRoute);

// start Express server
app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
