const knex = require("knex")(require("../knexfile"));
const signUp = (req, res) => {
  knex("profiles")
    .insert(req.body)
    .then((result) => {
      return knex("profiles").where({ id: result[0] });
    })
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((err) => {
      res.status(500).json({ message: "Sign Up failed" });
    });
};
module.exports = {
  signUp,
};
