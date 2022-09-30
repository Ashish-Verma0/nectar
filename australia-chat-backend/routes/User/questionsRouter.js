const express = require("express");
const questionsController = require("../../controllers/User/questionsController");
const router = express.Router();

router.get("/questions", questionsController.getQuestions);
router.patch("/questions", questionsController.questions);

module.exports = router;
