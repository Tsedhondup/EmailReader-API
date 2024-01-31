const router = require("express").Router();
const applicationController = require("../controllers/application_controller");

router.route("/addApplication").post(applicationController.addApplication);
router.route("/getAllApplications").get(applicationController.getAllApplications);

module.exports = router;
