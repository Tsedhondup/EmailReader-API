const knex = require("knex")(require("../knexfile"));
const signUp = (req, res) => {
  knex("profiles")
    .where({ email: req.body.email })
    .then((data) => {
      if (data.length === 0) {
        res.status(500).json({ message: "cannot find user" });
      } else {
        res.status(200).json({ userId: data[0].id });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  signUp,
};
