const mongoose = require("mongoose");
const userOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
    },
    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const UserOTP = mongoose.model("UserOTP", userOtpSchema);

module.exports = UserOTP;
