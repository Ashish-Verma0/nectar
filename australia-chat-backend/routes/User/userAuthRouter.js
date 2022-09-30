const express = require("express");
const userAuthController = require("./../../controllers/User/userAuthController");
const router = express.Router();

router.post("/signUp/SendOTP", userAuthController.signUpAndSendOTP);
router.post("/signUp/verify/otp", userAuthController.signUpWAndVerifyOtp);
router.post("/signUp", userAuthController.userSignup);
router.post("/signIn/sendOtp", userAuthController.signInAndSendOTP);
router.post("/signIn/withOtp", userAuthController.signInWithOtp);
router.post("/signIn/withPassword", userAuthController.signInWithPassword);
router.post("/signIn/forgetPassword", userAuthController.signInForgetPassword);

module.exports = router;
