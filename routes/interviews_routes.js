const router = require("express").Router();
const interviewController = require("../controllers/interviews_controller");

router.route("/allInterviews/:id").get(interviewController.getInterviews);

router.route("/addInterviews").post(interviewController.addInterviews);
router
  .route("/updateInterview/:id")
  .patch(interviewController.updateInterviews);

module.exports = router;
