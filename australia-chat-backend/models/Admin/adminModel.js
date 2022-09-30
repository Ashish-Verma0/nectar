const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  designation: {
    type: String,
  },
  photo: {
    type: String,
  },
  autoApproved: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    minlength: 8,
  },
  permissions: {
    dashboard: {
      type: Boolean,
      default: false,
    },
    analysis: {
      type: Boolean,
      default: false,
    },
    users: {
      type: Boolean,
      default: false,
    },
    plans: {
      type: Boolean,
      default: false,
    },
    notifications: {
      type: Boolean,
      default: false,
    },
    userActivity: {
      type: Boolean,
      default: false,
    },
    userApproval: {
      type: Boolean,
      default: false,
    },
    userPermission: {
      type: Boolean,
      default: false,
    },
    blog: {
      type: Boolean,
      default: false,
    },
    adminProfile: {
      type: Boolean,
      default: false,
    },
  },
});

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

AdminSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
