const mongoose = require("mongoose");
const userPhotoSchema = new mongoose.Schema({
  photoPath: {
    type: String,
  },
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
  album: {
    type: mongoose.Types.ObjectId,
    ref: "albumModel",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
  },
  disLike: [
    {
      type: mongoose.Types.ObjectId,
      ref: "userModel",
    },
  ],
});

const albumPhoto = mongoose.model("albumPhoto", userPhotoSchema);

module.exports = albumPhoto;
