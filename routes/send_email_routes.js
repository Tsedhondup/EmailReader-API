const router = require("express").Router();
const sendEmail = require("../controllers/sent_email");

router.route("/sendEmail").post(sendEmail.sendEmail);
router.route("/getSendEmails").get(sendEmail.getSentEmails);

module.exports = router;
