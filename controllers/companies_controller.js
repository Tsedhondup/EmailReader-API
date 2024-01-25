const knex = require("knex")(require("../knexfile"));

const addCompany = (req, res) => {
  // # get the company info and add to database
  // 8 should return 200 OK with no message
  knex("companies")
    .insert(req.body)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add job application!" });
    });
  // # get the all the emails of that company and add to email database
};

module.exports = {
  addCompany,
};
