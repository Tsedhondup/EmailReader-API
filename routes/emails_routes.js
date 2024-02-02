const router = require("express").Router();
const emailController = require("../controllers/emails_controller");

router.route("/allEmails/:applicationId").get(emailController.getAllEmails);
router.route("/emailDetail/:emailId").get(emailController.getEmailDetail);

module.exports = router;
