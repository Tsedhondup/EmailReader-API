const router = require("express").Router();
const profileController = require("../controllers/profile_controller");

router
  .route("/profile/:id")
  .get(profileController.getProfile)
  .post(profileController.createProfile);

module.exports = router;
