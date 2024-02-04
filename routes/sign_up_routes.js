const router = require("express").Router();
const signUpController = require("../controllers/sign_up_controller");

router.route("/signUp").post(signUpController.signUp);

module.exports = router;
