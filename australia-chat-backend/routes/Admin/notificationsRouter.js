const express = require("express");
const notificationsController = require("../../controllers/Admin/notificationsController");
const auth = require("./../../controllers/Admin/auth");

const router = express.Router();

router.post(
  "/createNotifications",
  auth.protect,
  notificationsController.createNotifications
);
router.get(
  "/getallNotifications",
  auth.protect,
  notificationsController.getallNotifications
);

module.exports = router;
