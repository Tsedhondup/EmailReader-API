const router = require("express").Router();
const sendEmail = require("../controllers/send_email");

router.route("/sendEmail").post(sendEmail.sendEmail);

module.exports = router;
