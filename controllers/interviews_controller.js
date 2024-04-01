const knex = require("knex")(require("../knexfile"));

const getInterviews = (req, res) => {
  knex("interviews")
    .where({ profile_id: req.params.id })
    .then((interviewData) => {
      if (interviewData.length === 0) {
        res.status(200).json({ interview: "no schedule interview" });
      } else {
        res.status(200).json({ interviewData });
      }
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
const updateSome = (req, res) => {
  knex("interviews")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("interviews").where({
        id: req.params.id,
      });
    })
    .then((updatedInterviews) => {
      res.json(updatedInterviews[0]);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to update interviews with ID: ${req.params.id}`,
      });
    });
};

const updateAll = () => {
  knex("interviews")
    .where({ id: req.params.id })
    .update(req.body)
    .then(() => {
      return knex("interviews").where({
        id: req.params.id,
      });
    })
    .then((updatedInterviews) => {
      res.json(updatedInterviews[0]);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to update interviews with ID: ${req.params.id}`,
      });
    });
};

module.exports = {
  getInterviews,
  addInterviews,
  updateSome,
  updateAll,
};
  