const knex = require("knex")(require("../knexfile"));
const emailController = require("../controllers/emails_controller");

const addCompany = (req, res) => {
  knex("companies")
    .insert(req.body)
    .then((result) => {
      // get the added company
      return knex("companies").where({ id: result[0] });
    })
    .then((newCompany) => {
      // invoke addEmails function
      emailController.getEmails(newCompany[0].company_email, newCompany[0].id);
      return newCompany;
    })
    .then((newCompany) => {
      // get and send newAdded company
      res.status(201).send(newCompany);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add job application!" });
    });
};

module.exports = {
  addCompany,
};
