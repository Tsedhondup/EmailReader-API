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
        req,
        res,
        newApplication[0].company_email,
        newApplication[0].id
      );
      // return newApplication;  // get and send newAdded company
      res.status(201).json(newApplication);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add job application!" });
    });
};
const getAllApplications = (req, res) => {
  knex("applications")
    .then((applicationData) => {
      res.status(200).json(applicationData);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getApplicationDetails = (req, res) => {
  // VARIABLE TO STORE INTERVIEW LISTS
  let emails;
  // VARIABLE TO STORE INTERVIEW LISTS
  let interviews;
  knex
    .from("emails")
    .where({ application_id: req.params.id })
    .then((foundEmails) => {
      if (foundEmails.length === 0) {
        // O email is valid data for client request*****
        console.log(`Cannot find emails with application Id: ${req.params.id}`);
      }
      // store email lists 
      emails = foundEmails;
    })
    .then(() => {
      // GET ALL THE INTERVIEWS
      return knex("interviews").where({
        application_id: req.params.id,
      });
    })
    .then((foundInterviews) => {
      if (foundInterviews.length === 0) {
        // 0 interview is valid data for client request****
        console.log(
          `Cannot find interviews with application id:${req.params.id}`
        );
      }
      // store interview lists
      interviews = foundInterviews;
    })
    .then(() => {
      res.status(200).json({ message: { emails, interviews } });
    })
    .catch((err) => {
      res.status(500).json({
        message: `Cannot retrieve email with application id:${req.params.id}`,
      });
    });
};

module.exports = {
  addApplication,
  getAllApplications,
  getApplicationDetails,
};
