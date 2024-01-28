const knex = require("knex")(require("../knexfile"));

const getInterviews = (req, res) => {
  knex("interviews").then((interviewData) => {
    if (interviewData.length === 0) {
      res.status(400).json({ message: "Cannot find interviews" });
    }
    res.status(200).json(interviewData);
  });
};

const addInterviews = (req, res) => {
  knex("interviews")
    .insert(req.body)
    .then((result) => {
      return knex("interviews").where({ id: result[0] });
    })
    .then((newInterview) => {
      res.status(201).json(newInterview);
    })
    .catch((err) => {
      res.status(500).json({ message: "Cannot add Interviews" });
    });
};
module.exports = {
  getInterviews,
  addInterviews,
};
