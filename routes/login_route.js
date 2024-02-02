const router = require("express").Router();
const loginController = require("../controllers/login_controller");

router.route("/login").post(loginController.authenticateUser);

module.exports = router;
