const knex = require("knex")(require("../knexfile"));
const authenticateUser = (req, res) => {
  const { username, password } = req.body;
  const user = users[username];
  if (user && user.password === password) {
    // STEP 1: When a user provides a correct username/password,
    // the user can be considered authenticated.
    // Create a JWT token for the user, and add their name to
    // the token. Send the token back to the client.
  }
};
module.exports = {
  authenticateUser,
};
