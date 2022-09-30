const User = require("../../models/Admin/userModel");
const jwt = require("jsonwebtoken");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 62 * 62 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  // remove pwd from user
  user.password = undefined;
  res.cookie("bearerToken", token, cookieOptions);
  res.status(statusCode).json({
    status: "success",
    data: {
      user,
    },
  });
};
exports.userSignupWithEmail = async (req, res) => {
  try {
      const {email} = res.body
    const CheckEmail = await User.findOne({email})
    if (CheckEmail) {
        
    }
  } catch (error) {
    console.log("error with signup");
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(200).json({
        status: "success",
        message: "enter password  admin name",
      });
    }
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      res.status(403).json({
        data: "invalid password or admin name",
      });
    } else {
      createSendToken(admin, 200, res);
    }
  } catch (error) {}
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(204).json({
        status: "success",
        message: "enter email",
      });
    }
    const admin = await Admin.findOne({ email }).select("+password");

    if (!admin) {
      res.status(204).json({
        data: "please enter a valid email",
      });
    } else {
      res.status(200).send("ok");
    }
  } catch (error) {}
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      res.status(200).json({
        status: "success",
        message: "Enter correct password",
      });
    }
    const admin = await Admin.findOne({ email }).select("+password");
    admin.password = req.body.password;
    admin.passwordConfirm = req.body.password;
    await admin.save();
    if (!admin) {
      res.status(200).json({
        data: "Enter correct password",
      });
    } else {
      res.status(201).send("password change");
    }
  } catch (error) {}
};

exports.logout = async (req, res) => {
  try {
    res.status(200).send({ message: "Logout successfully" });
  } catch (error) {}
};
