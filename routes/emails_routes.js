const router = require("express").Router();
const emailController = require("../controllers/emails_controller");

router.route("/allEmails/:applicationId").get(emailController.getAllEmails);
router.route("/emailDetail/:emailId").get(emailController.getEmailDetail);
router.route("/getNewEmails").get(emailController.getNewEmails);

module.exports = router;
