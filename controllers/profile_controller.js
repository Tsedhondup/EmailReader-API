const knex = require("knex")(require("../knexfile"));

const getProfile = (_req, res) => {
  knex("profiles")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Users: ${err}`));
};

module.exports = {
  getProfile,
};
