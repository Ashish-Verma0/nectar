const mongoose = require("mongoose");
const diarySchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "userModel",
  },
});

const UserDiary = mongoose.model("UserDiary", diarySchema);

module.exports = UserDiary;
