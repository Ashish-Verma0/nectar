const express = require("express");
const diaryController = require("../../controllers/User/diaryController");
const router = express.Router();

router.post("/createDiary", diaryController.createDiary);
router.get("/getOneDiary/:did", diaryController.getOneDiary);
router.get("/getUserDiary/:uid", diaryController.getUserDiary);
router.patch("/editDiary/:did", diaryController.editDiary);
router.delete("/deleteDiary/:did", diaryController.deleteDiary);

module.exports = router;
