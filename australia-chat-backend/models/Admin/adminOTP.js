const mongoose = require("mongoose");
const adminOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const AdminOTP = mongoose.model("AdminOTP", adminOtpSchema);

module.exports = AdminOTP;
