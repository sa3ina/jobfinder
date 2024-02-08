const express = require("express");
const router = express.Router();
const Controller = require("../controllers/EmployerController");
router.get("/employer", Controller.getall);
router.get("/employer/:id", Controller.getbyId);
router.delete("/employer/:id", Controller.deleteByiD);
router.post("/employer", Controller.postOne);

module.exports = router;
