const knex = require("knex")(require("../knexfile"));

const getProfile = (_req, res) => {
  knex("profiles")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Profile: ${err}`));
};

const createProfile = (req, res) => {
  knex("profiles")
    .insert(req.body)
    .then((result) => {
      console.log(result[0]);
      return knex("profiles").where({ id: result[0] });
    })
    .then((newProfile) => {
      res.status(201).json(newProfile);
    })
    .catch(() => {
      res.status(500).json({ message: "unable to create new profile" });
    });
};

module.exports = {
  getProfile,
  createProfile,
};
