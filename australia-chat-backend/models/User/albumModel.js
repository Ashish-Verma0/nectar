const mongoose = require("mongoose");
const albumSchema = new mongoose.Schema({
  albumName: {
    type: String,
  },
  photo: [
    {
      type: mongoose.Types.ObjectId,
      ref: "albumPhotoModel",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  viewability: {
    type: String,
    default: "public",
  },
  like: [
    {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  ],
  disLike: [
    {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
  },
});

const album = mongoose.model("album", albumSchema);

module.exports = album;
