const router = require("express").Router();
const loginController = require("../controllers/login_controller");

// router.route("/login").post(loginController.authenticateUser);
router.route("/login").post(loginController.logIn);

module.exports = router;
