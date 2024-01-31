const knex = require("knex")(require("../knexfile"));
const emailController = require("./emails_controller");

const addApplication = (req, res) => {
  knex("applications")
    .insert(req.body)
    .then((result) => {
      // get the added company
      return knex("applications").where({ id: result[0] });
    })
    .then((newApplication) => {
      // invoke addEmails function
      emailController.fetchEmails(
        newApplication[0].company_email,
        newApplication[0].id
      );
      return newApplication;
    })
    .then((newApplication) => {
      // get and send newAdded company
      res.status(201).send(newApplication);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add job application!" });
    });
};
const getAllApplications = (req, res) => {
  knex("applications").then((applicationData) => {
    if (applicationData.length === 0) {
      res.status(400).json({ message: "Cannot find any job applications" });
    }
    res.status(200).json(applicationData);
  });
};

module.exports = {
  addApplication,
  getAllApplications,
};
