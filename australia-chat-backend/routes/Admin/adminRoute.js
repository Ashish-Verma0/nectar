const express = require("express");
const router = express.Router();
const auth = require("../../controllers/Admin/auth");
const adminController = require("../../controllers/Admin/adminController");

// const controller = require("../../controllers/Admin/controller");

router.route("/").get(auth.logout).post(auth.adminLogin);
router.route("/forget").post(auth.forgetPassword).patch(auth.changePasswordOTP);
router.post("/adminSignup", auth.adminSignup);
router.get(
  "/adminDashboard/:aid",
  auth.protect,
  adminController.adminDashboard
);
router.get("/getAllAdmins", auth.protect, adminController.getAllAdmins);
router.delete(
  "/deleteAdminUser/:id",
  auth.protect,
  adminController.deleteAdminUser
);

router.post(
  "/profile/passwordchange",
  auth.protect,
  auth.userProfileChangePassword
);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// router.post("/updatePassword", authController.updatePassword);
// router.post("/updateMe", authController.protect, userController.updateMe);

// router.delete("/deleteMe", authController.protect, userController.deleteMe);

// router.route("/");
// //   .get(userController.getAllUsers)
// //   .post(userController.createUser);

// router.route("/:id");
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
