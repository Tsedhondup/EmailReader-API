const router = require("express").Router();
const interviewController = require("../controllers/interviews_controller");

router.route("/allInterviews/:id").get(interviewController.getInterviews);

router.route("/addInterviews").post(interviewController.addInterviews);

module.exports = router;
