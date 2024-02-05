const { v4: uuidv4 } = require("uuid");
const knex = require("knex")(require("../knexfile"));
const signUp = (req, res, next) => {
  knex("profiles")
    .insert(req.body)
    .then((result) => {
      return knex("profiles").where({ id: result[0] });
    })
    .then(async () => {
      // CREATE SESSION ID
      // CREATE SESSION DATA
      const sessionId = {
        id: uuidv4(),
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

      res.status(201).json({ session_id: sessionId.id });
    })
    .catch((err) => {
      res.status(500).json({ message: "Sign Up failed" });
    });
};
module.exports = {
  signUp,
};
