const router = require("express").Router();
const emailController = require("../controllers/emails_controller");

router.route("/allEmails/:companyId").get(emailController.getAllEmails);
router.route("/emailDetail/:emailId").get(emailController.getEmailDetail);

module.exports = router;
