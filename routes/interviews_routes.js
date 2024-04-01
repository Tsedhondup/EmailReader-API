const router = require("express").Router();
const interviewController = require("../controllers/interviews_controller");

router.route("/allInterviews/:id").get(interviewController.getInterviews);

router.route("/addInterviews").post(interviewController.addInterviews);
router.route("/updateInterview/:id").patch(interviewController.updateSome);
router.route("/updateInterview/:id").patch(interviewController.updateAll);

module.exports = router;
