const knex = require("knex")(require("../knexfile"));
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  knex("profiles")
    .where({ email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        res.status(500).json({ message: "cannot find user" });
      } else {
        // CREATE SESSION DATA
        const sessionId = {
          profileId: data[0].id,
          email: req.body.email,
          password: req.body.password,
        };
        fs.writeFile(
          "./session/session.json",
          JSON.stringify(sessionId),
          (err) => {
            console.log("done");
            if (err) {
              console.log(err);
            }
          }
        );
        res
          .status(200)
          .json([{ session_id: sessionId.id }, { profile_id: data[0].id }]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
const logIn = (req, res) => {
  knex("profiles")
    .where({ email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        res.status(500).json({
          message: "Invalid password or email",
          error_type: "authentication error",
        });
      } else {
        if (
          req.body.email !== data[0].email ||
          req.body.password !== data[0].password
        ) {
          res.status(500).json({
            message: "Invalid password or email",
            error_type: "authentication error",
          });
        } else {
          // CREATE SESSION DATA
          const sessionId = {
            profileId: data[0].id,
            id: uuidv4(),
            email: req.body.email,
            password: req.body.password,
          };
          fs.writeFile(
            "./session/session.json",
            JSON.stringify(sessionId),
            (err) => {
              console.log("done");
              if (err) {
                console.log(err);
              }
            }
          );

          // CREATE JWT TOKEN
          const jwtKey = process.env.JWT_KEY;
          res.status(200).json({
            token: jwt.sign({ username: data[0].full_name }, jwtKey),
            message: "login successful",
            profile_id: data[0].id,
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  authenticateUser,
  logIn,
};
