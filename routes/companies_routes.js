const router = require("express").Router();
const companyController = require("../controllers/companies_controller");

router.route("/addCompany").post(companyController.addCompany);
router.route("/allCompanies").get(companyController.getAllCompanies);

module.exports = router;
