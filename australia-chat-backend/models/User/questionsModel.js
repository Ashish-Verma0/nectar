const mongoose = require("mongoose");
const questionsSchema = new mongoose.Schema(
  {
    quesNo: {
      type: Number,
      unique: true,
    },
    questions: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Questions = mongoose.model("questions", questionsSchema);

module.exports = Questions;
