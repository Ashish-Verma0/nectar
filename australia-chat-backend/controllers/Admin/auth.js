require("dotenv").config();
const Admin = require("../../models/Admin/adminModel");
const AdminOTP = require("../../models/Admin/adminOTP");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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
exports.adminSignup = async (req, res) => {
  try {
    // console.log(req.body);
    if (req.body.passwordConfirm === req.body.password) {
      const checkuser = await Admin.findOne({ email: req.body.email });
      // console.log(checkuser);
      if (!checkuser) {
        const user = await Admin.create({
          // profileImage: req.body.profileImage,
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          passwordConfirm: req.body.passwordConfirm,
          designation: req.body.designation,
          permissions: req.body.permissions,
        });
        // await createSendToken(newAdmin, 201, res);
        res.status(200).json({
          status: "success",
          message: "Admin User Created",
          data: {
            user,
          },
        });
      } else {
        res.status(409).json({
          status: "conflict",
          message: "Email already exists",
        });
      }
    } else {
      res.status(403).json({
        status: "success",
        message: "password should be same ",
      });
    }
  } catch (error) {
    // console.log("error with signup", error);
    res.status(500).json({
      status: "Error",
      message: "Internal server Error",
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(404).json({
        status: "success",
        message: "Enter Password Or Email",
      });
    } else {
      const admin = await Admin.findOne({ email }).select("+password");
      if (!admin || !(await admin.correctPassword(password, admin.password))) {
        res.status(403).json({
          status: "unauthorized",
          message: "Invalid Username or Password",
        });
      } else {
        createSendToken(admin, 200, res);
      }
    }
  } catch (error) {
    res.status(403).json({
      status: "Error",

      message: "Internal Server Error",
    });
  }
};

// exports.forgetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       res.status(204).json({
//         status: "success",
//         message: "enter email",
//       });
//     }
//     const admin = await Admin.findOne({ email }).select("+password");
//     if (!admin) {
//       res.status(200).json({
//         message: "please enter a valid email",
//       });
//     } else {
//       res.status(200).json({message:"ok"});
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(401).json({
        status: "success",
        message: "Invalid Email Id",
      });
    }
    const admin = await Admin.findOne({ email });
    if (!admin) {
      res.status(404).json({
        status: "success",
        message: "Email id not found",
      });
    } else {
      const otp =
        `${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}${Math.trunc(Math.random() * 9 + 1)}${Math.trunc(
          Math.random() * 9 + 1
        )}` * 1;
      const checkOTP = await AdminOTP.findOne({ email });
      if (!checkOTP) {
        await AdminOTP.create({
          email,
          otp,
        });
        console.log(otp);
        res.status(200).json({
          status: "success",
          message: "OTP Send To you Email Id",
        });
      } else {
        checkOTP.otp = otp;
        await checkOTP.save();
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.NODEMAILER_MAIL,
            pass: process.env.NODEMAILER_PASS,
          },
        });
        const mailOptions = {
          from: process.env.NODEMAILER_MAIL,
          to: email,
          subject: "OTP Verification Email",
          text: `Your otp is ${otp}`,
        };
        console.log(otp);
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.log(err);
        });

        res.status(200).json({
          status: "success",
          message: "OTP Send To you Email Id",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

// exports.changePassword = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email && !password) {
//       res.status(200).json({
//         status: "success",
//         message: "Enter correct password",
//       });
//     }
//     const admin = await Admin.findOne({ email }).select("+password");
//     admin.password = req.body.password;
//     admin.passwordConfirm = req.body.password;
//     await admin.save();
//     if (!admin) {
//       res.status(200).json({
//         data: "Enter correct password",
//       });
//     } else {
//       res.status(201).send("password change");
//     }
//   } catch (error) {}
// };
// exports.changePassword = async (req, res) => {
//   try {
//     const { email, password, passwordConfirm } = req.body;
//     if (password === passwordConfirm) {
//       const admin = await Admin.findOne({ email }).select("+password");
//       admin.password = req.body.password;
//       admin.passwordConfirm = req.body.password;
//       await admin.save();
//       res.status(200).json({
//         status: "success",
//         message: "Password Changed Sucessfully ",
//       });
//     } else {
//       res.status(200).json({
//         status: "conflict",
//         message: "Password Must Be Same",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server Error",
//     });
//   }
// };

exports.userProfileChangePassword = async (req, res) => {
  try {
    const { id, password, passwordConfirm } = req.body;
    if (password === passwordConfirm) {
      const admin = await Admin.findById(id).select("+password");
      admin.password = req.body.password;
      admin.passwordConfirm = req.body.password;
      await admin.save();

      res.status(200).json({
        status: "success",
        message: "Password Changed Successfully ",
      });
    } else {
      res.status(409).json({
        status: "conflict",
        message: "Password Must Be Same",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal server Error",
    });
  }
};

exports.changePasswordOTP = async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    const otp = req.body.otp * 1;
    console.log(req.body);
    const checkEmail = await Admin.findOne({ email }).select("+password");
    if (checkEmail) {
      const adminOTP = await AdminOTP.findOne({ email });
      var otpDate = new Date(adminOTP.updatedAt.getTime() + 10 * 60000);
      if (adminOTP.otp === otp && otpDate > new Date(Date.now())) {
        checkEmail.password = password;
        checkEmail.passwordConfirm = passwordConfirm;
        await checkEmail.save();

        res.status(200).json({
          status: "success",
          message: "Password change Successfully",
        });
      } else if (otpDate < new Date(Date.now())) {
        res.status(401).json({
          status: "unauthorized ",
          message: "Otp Expire",
        });
      } else {
        res.status(401).json({
          status: "unauthorized ",
          message: "Incorrect OTP",
        });
      }
    }
    // res.status(404).json({
    //   status: "not found ",
    //   message: "Email not found",
    // });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.cookie && req.headers.cookie.startsWith("bearer")) {
      token = req.headers.cookie.split("=")[1];
    }
    // console.log(token);
    if (!token) {
      res.status(401).json({
        status: "sadsa",
        message: "you are not logged in ! please log in to get access",
      });
    } else {
      // 2) Verifiatiion token
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded);
      // check
      currentUser = await Admin.findById(decoded.id);
      if (!currentUser) {
        res.status(500).json({
          status: "sadsa",
          message: "some thing went worng",
        });
      }

      // check if user change password after the token was issued

      req.admin = currentUser;
      // console.log(req.admin);
      next();
    }
    console.log("hello form auth.protect");
  } catch (error) {
    // res.status(401).json({
    //   status: "sadsa",
    //   message: "you are not logged in ! please log in to get access",
    // });
  }
  // next();

  // console.log(req.headers.cookie);
  // 1) gettion token and check of it"s there
};

exports.logout = async (req, res) => {
  try {
    console.log("log");

    res.status(200).clearCookie("bearerToken");
    send({ message: "Logout successfully" });
  } catch (error) {}
};
