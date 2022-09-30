//
const express = require("express");
const albumUserController = require("../../controllers/Admin/User/adminUserControllers");
const auth = require("./../../controllers/Admin/auth");
const router = express.Router();

router.get(
  "/getAllUser/:limit/:page",
  auth.protect,
  albumUserController.getallUserWithLimit
);
router.get(
  "/getAllUser/toAprove/:limit/:page",
  auth.protect,
  albumUserController.getallUserToAproveWithLimit
);
router.post(
  "/getAllUser/toAprove/notification/reupload",
  auth.protect,
  albumUserController.userNotificationSendForReUpload
);
router.post(
  "/getAllUser/toAprove/approve",
  auth.protect,
  albumUserController.userFinalApproval
);
router.get("/getUserStatus", auth.protect, albumUserController.getallAnalysis);
router.get("/searchUser/:query", auth.protect, albumUserController.searchUser);
router.get("/blockUser/:blockId", auth.protect, albumUserController.blockUser);
router.get(
  "/unBlockUser/:unBlockId",
  auth.protect,
  albumUserController.unBlockUser
);

module.exports = router;
