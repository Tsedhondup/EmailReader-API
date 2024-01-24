const router = require("express").Router();
const profileController = require("../controllers/profile_controller");

router.route("/profile").get(profileController.getProfile);

module.exports = router;
