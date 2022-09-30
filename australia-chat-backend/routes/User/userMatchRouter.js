const express = require("express");
const userMatchController = require("./../../controllers/User/userMatchController");
const router = express.Router();

router.get(
  "/getUserList/:userId/:page/:limit",
  userMatchController.getUsersToShowOnInlimit
);

router.patch("/skippedUser", userMatchController.skippedUser);
router.patch("/likeUser", userMatchController.likeUser);
router.patch("/matchUser", userMatchController.matchUser);
router.patch("/unMatchUser", userMatchController.unMatchUser);
router.patch("/findMyMateADate", userMatchController.findMyMateADate);

router.get("/likedList/:userId", userMatchController.getUsersLiked);
router.get("/matchesList/:userId", userMatchController.getUsersMatches);
router.get("/whoLikedYou/:userId", userMatchController.whoLikedYou);
router.get("/getUser/:userId", userMatchController.getUser);

module.exports = router;
