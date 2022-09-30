const express = require("express");
const auth = require("./../../controllers/Admin/auth");
const router = express.Router();

const {
  autoGetApproved,
  autoPostApproved,
  userPermissionGet,
  userPermissionPost,
} = require("../../controllers/Admin/User/index");

router
  .route("/:id")
  .get(auth.protect, autoGetApproved)
  .patch(auth.protect, autoPostApproved);
router
  .route("/:id/permission")
  .get(auth.protect, userPermissionGet)
  .post(auth.protect, userPermissionPost);

module.exports = router;
