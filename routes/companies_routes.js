const router = require("express").Router();
const companyController = require("../controllers/companies_controller");

router.route("/addCompany").post(companyController.addCompany);

module.exports = router;
