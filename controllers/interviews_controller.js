const knex = require("knex")(require("../knexfile"));

const getInterviews = (req, res) => {
  knex("interviews").then((interviewData) => {
    if (interviewData.length === 0) {
      res.status(400).json({ message: "Cannot find interviews" });
    }

    res.status(200).json(interviewData);
  });
};
module.exports = {
  getInterviews,
};
