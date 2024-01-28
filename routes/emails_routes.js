const router = require("express").Router();
const emailController = require("../controllers/emails_controller");

router.route("/allEmails/:companyId").get(emailController.getEmails);

module.exports = router;
