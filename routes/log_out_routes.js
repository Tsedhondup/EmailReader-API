const router = require("express").Router();
const loginController = require("../controllers/log_out_controller");

router.route("/logOut").post(loginController.logOut);

module.exports = router;
