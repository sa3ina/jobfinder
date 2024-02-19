const express = require("express");
const router = express.Router();
const Controller = require("../controllers/CommentController");
router.get("/comment", Controller.getall);
router.get("/comment/:id", Controller.getbyId);
router.delete("/comment/:id", Controller.deleteByiD);
router.post("/comment", Controller.postOne);
router.patch("/comment/:id", Controller.patchOne);
module.exports = router;
