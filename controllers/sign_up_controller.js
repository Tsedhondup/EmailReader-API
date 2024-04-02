const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile"));
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");

const signUp = (req, res, next) => {
  // CHECK IF THE USER WITH SAME EMAIL EXIST OT NOT
  knex("profiles")
    .where({ email: req.body.email })
    .then((data) => {
      // IF USER WITH SIMILAR EMAIL IS FOUND
      if (data.length > 0) {
        res
          .status(500)
          .json({ message: "Already exist user, use different email" });
      } else {
        // IF NOT CREATE NEW PROFILE IN DATABASE
        knex("profiles")
          .insert(req.body)
          .then((result) => {
            knex("profiles")
              .where({ id: result[0] })
              .then(async (data) => {
                // CREATE SESSION DATA
                const sessionId = {
                  profileId: data[0].id,
                  email: req.body.email,
                  password: req.body.password,
                };
                await fs.writeFile(
                  "./session/session.json",
                  JSON.stringify(sessionId),
                  (err) => {
                    console.log("done");
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                // CREATE TOKEN AND SEND TO CLIENT
                const jwtKey = process.env.JWT_KEY;
                res.status(200).json({
                  token: jwt.sign({ username: data[0].full_name }, jwtKey),
                  message: "Account created",
                  profileId: data[0].id,
                });
              });
          })
          .catch((err) => {
            res
              .status(500)
              .json({ message: "Server issue", success: "failed" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "Server issue", success: "failed" });
    });
};
module.exports = {
  signUp,
};
