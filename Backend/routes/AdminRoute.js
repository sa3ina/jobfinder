const express = require("express");
const router = express.Router();
const Controller = require("../controllers/AdminController");

router.get("/admin", Controller.getall);
router.get("/admin/:id", Controller.getbyId);
router.delete("/admin/:id", Controller.deleteByiD);
router.post("/admin", Controller.postOne);
router.patch("/admin/:id", Controller.patchOne);
router.post("/admin/login", Controller.login);

module.exports = router;
