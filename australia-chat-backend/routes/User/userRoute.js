const express = require("express");
const userController = require("./../../controllers/User/userController");
// const userController = require("../../controllers/Admin/adminController");
// const auth = require("../../controllers/User/auth");
const user = require("../../controllers/User/userController");

const router = express.Router();

router.patch("/iWantToSwipe/:userId", userController.iWantToSwipe);
// router.post("/userLogin", auth.userLogin);
router.get("/getUsers", user.getUsers);

// router.post("/forgotPassword", authController.forgotPassword);
// router.patch("/resetPassword/:token", authController.resetPassword);

// router.post("/updatePassword", authController.updatePassword);
// router.post("/updateMe", authController.protect, userController.updateMe);

// router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.route("/");
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

router.route("/:id");
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

module.exports = router;
