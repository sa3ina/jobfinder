const express = require("express");
const router = express.Router();
const Controller = require("../controllers/JobsController");
router.get("/job", Controller.getall);
router.get("/job/:id", Controller.getbyId);
router.delete("/job/:id", Controller.deleteByiD);
router.post("/job", Controller.postOne);
router.patch("/job/:id", Controller.patchById);

module.exports = router;
