const router = require("express").Router();
const interviewController = require("../controllers/interviews_controller");

router.route("/allInterviews").get(interviewController.getInterviews);

module.exports = router;
