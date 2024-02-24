const knex = require("knex")(require("../knexfile"));
const fs = require("fs");
const logOut = async (req, res) => {
  await fs.writeFile("./session/session.json", JSON.stringify({}), (err) => {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Sign up completed" });
};
module.exports = {
  logOut,
};
