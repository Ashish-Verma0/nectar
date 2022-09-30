const mongoose = require("mongoose");

const notificationsModel = new mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
      // required: true,
    },
    message: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Notifications = mongoose.model("Notifications", notificationsModel);
module.exports = Notifications;
