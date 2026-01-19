const express = require("express");
const router = express.Router();
const Controller = require("../controllers/JobseekerController");

router.get("/jobseeker", Controller.getall);
router.get("/jobseeker/:id", Controller.getbyId);
router.delete("/jobseeker/:id", Controller.deleteByiD);
router.post("/jobseeker", Controller.postOne);
router.post("/jobseeker/login", Controller.login);

module.exports = router;
