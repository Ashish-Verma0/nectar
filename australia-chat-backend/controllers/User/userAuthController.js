require("dotenv").config();
const User = require("../../models/User/userModel");
const UserOTP = require("../../models/User/userOTP");
const jwt = require("jsonwebtoken");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);
const internalServerError = (route, res) => {
  res.status(500).json({
    status: "Error",
    message: "Internal Server Error",
    route,
  });
};

// working
exports.signUpAndSendOTP = async (req, res) => {
  try {
    const { phone } = req.body;
    const checkPhone = await User.findOne({ phone });
    if (!checkPhone) {
      const checkOTP = await UserOTP.findOne({ phone });

      const otp =
        `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}` * 1;
      if (checkOTP) {
        checkOTP.otp = otp;
        await checkOTP.save();
      } else {
        await UserOTP.create({ phone, otp });
      }
      console.log(otp);
      client.messages
        .create({
          body: `Your otp is ${otp}`,
          to: `+91${phone}`,
          from: `${process.env.TWILIO_NUMBER}`,
        })
        .then((message) => console.log(message))
        .catch((err) => console.log(err));
      res.status(200).json({
        status: "success",
        message: "Otp Is sended to phone id and Otp is valid for 10 min",
      });
    } else {
      res.status(409).json({
        status: "Conflict",
        message: "This phone id already exists",
      });
    }
  } catch (error) {
    internalServerError("/api/v1/users//signUp/VerifyOtp", res);
  }
};

exports.signUpWAndVerifyOtp = async (req, res) => {
  try {
    const phone = req.body.phone;
    const otp = req.body.otp * 1;

    const checkPhone = await User.findOne({ phone });
    if (!checkPhone) {
      const userOtp = await UserOTP.findOne({ phone });
      var otpDate = new Date(userOtp.updatedAt.getTime() + 10 * 60000);
      if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
        res.status(200).json({
          status: "success",
          message: "Otp Is verified",
        });
      } else if (otpDate < new Date(Date.now())) {
        res.status(401).json({
          status: "unauthorized ",
          message: "OTP Expired",
        });
      } else {
        res.status(401).json({
          status: "unauthorized ",
          message: "Incorrect OTP",
        });
      }
    } else {
      res.status(409).json({
        status: "Conflict",
        message: "This phone already exists",
      });
    }
  } catch (error) {
    internalServerError("/api/v1/users/signUp/SendOTP", res);
  }
};
exports.userSignup = async (req, res) => {
  console.log(req.body);
  try {
    const {
      latitude,
      longitude,
      name,
      myInterests,
      dob,
      yourStarSign,
      iIdentifyAs,
      lookingFor,
      readyFor,
      moreAboutMe,
      myIdealMatch,
      phone,
    } = req.body;
    // const checkEmail = await User.findOne({ email });
    const user = await User.findOne({ phone });
    if (!user && name && phone) {
      const userId = (await User.find().count()) + 1;
      const newUser = await User.create({
        userId,
        location: { type: "Point", coordinates: [latitude, longitude] },
        name,
        myInterests,
        dob,
        yourStarSign,
        iIdentifyAs,
        lookingFor,
        readyFor,
        moreAboutMe,
        myIdealMatch,
        phone,
      });
      const token = createSendToken(newUser);

      res.status(201).json({
        status: "Created",
        message: "User create successfully",
        newUser,
        token,
      });
    } else {
      res.status(409).json({
        status: "Conflict",
        message: "This phone already exists",
      });
    }
  } catch (error) {
    console.log(error);
    internalServerError("/api/v1/users/userSignup", res);
  }
};

exports.signInWithOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const checkUserPhone = await User.findOne({ phone });

    if (phone && checkUserPhone) {
      const userOtp = await UserOTP.findOne({ phone });
      var otpDate = new Date(userOtp.updatedAt.getTime() + 10 * 60000);
      if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
        const user = await User.findOne({ phone });
        token = signToken(user._id);
        res.status(200).json({
          status: "success",
          message: "Login successfully",
          user,
          token,
        });
      } else if (otpDate < new Date(Date.now())) {
        res.status(401).json({
          status: "unauthorized ",
          message: "OTP Expired",
        });
      } else {
        res.status(401).json({
          status: "unauthorized ",
          message: "Incorrect OTP",
        });
      }
    } else {
      res.status(404).json({
        status: "not found",
        message: "Phone Number not  not found, please signup",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signInAndSendOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;
    if (email) {
      const checkEmail = await User.findOne({ email });
      if (checkEmail) {
        const checkOTP = await UserOTP.findOne({ email });
        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        if (checkOTP) {
          checkOTP.otp = otp;
          await checkOTP.save();
        } else {
          await UserOTP.create({ email, otp });
        }

        console.log(otp);

        res.status(200).json({
          status: "success",
          message: "Otp Is sent to Email id and Otp is valid for 10 min",
        });
      } else {
        res.status(404).json({
          status: "not found",
          message: "user Not found",
        });
      }
    } else if (phone) {
      const checkPhone = await User.findOne({ phone });
      if (checkPhone) {
        const checkOTP = await UserOTP.findOne({ phone });

        const otp =
          `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
            Math.random() * 9 + 1
          )}` * 1;
        if (checkOTP) {
          checkOTP.otp = otp;

          await checkOTP.save();
        } else {
          await UserOTP.create({ phone, otp });
        }
        console.log(otp);
        res.status(200).json({
          status: "success",
          message: "Otp Is sent to phone id and Otp is valid for 10 min",
        });
      } else {
        res.status(404).json({
          status: "not found",
          message: "user Not found",
        });
      }
    }
  } catch (error) {
    internalServerError("/api/v1/users//signUp/VerifyOtp", res);
  }
};

exports.signInWithPassword = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (email) {
      if (!email || !password) {
        res.status(404).json({
          status: "success",
          message: "enter password or email",
        });
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(403).json({
          data: "Invalid password or Admin name",
        });
      } else {
        user.password = undefined;
        const token = signToken(user._id);
        res.status(200).json({
          status: "success",
          message: "login Successfully",
          user,
          token,
        });
      }
    } else if (phone) {
      if (!phone || !password) {
        res.status(404).json({
          status: "success",
          message: "enter password or phone",
        });
      }
      const user = await User.findOne({ phone }).select("+password");

      if (!user || !(await user.correctPassword(password, user.password))) {
        res.status(403).json({
          data: "invalid password or Admin name",
        });
      } else {
        const token = signToken(user._id);
        res.status(200).json({
          status: "success",
          message: "login Successfully",
          user,
          token,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.signInCheckEmailOrPhone = async (req, res) => {
  const { email, phone } = req.body;
  if (email) {
    const checkEmail = await User.find({ email });
    if (checkEmail) {
      res.s;
    }
  } else if (phone) {
  }
};

exports.signInForgetPassword = async (req, res) => {
  const { email, phone, password, passwordConfirm, otp } = req.body;
  const checkUserEmail = await User.findOne({ email });
  const checkUserPhone = await User.findOne({ phone });

  if (checkUserEmail && email) {
    const userOtp = await UserOTP.findOne({ email });
    var otpDate = new Date(userOtp.updatedAt.getTime() + 10 * 60000);
    if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
      const user = await User.findOne({ email }).select("+password");
      user.password = password;
      user.passwordConfirm = passwordConfirm;
      await user.save();

      res.status(200).json({
        status: "success",
        message: "successfully changed password",
      });
    } else if (otpDate < new Date(Date.now())) {
      res.status(401).json({
        status: "unauthorized ",
        message: "OTP Expired",
      });
    } else {
      res.status(401).json({
        status: "unauthorized ",
        message: "Incorrect OTP",
      });
    }
  } else if (phone && checkUserPhone) {
    const userOtp = await UserOTP.findOne({ phone });
    var otpDate = new Date(userOtp.updatedAt.getTime() + 10 * 60000);
    if (userOtp.otp === otp && otpDate > new Date(Date.now())) {
      const user = await User.findOne({ phone }).select("+password");
      user.password = password;
      user.passwordConfirm = passwordConfirm;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "successfully changed password",
      });
    } else if (otpDate < new Date(Date.now())) {
      res.status(401).json({
        status: "unauthorized ",
        message: "OTP Expired",
      });
    } else {
      res.status(401).json({
        status: "unauthorized ",
        message: "Incorrect OTP",
      });
    }
  } else {
    res.status(404).json({
      status: "not found",
      message: "Phone Number not found, please signup",
    });
  }
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user) => {
  return (token = signToken(user._id));
};
