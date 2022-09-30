const mongoose = require("mongoose");

const plansSchema = new mongoose.Schema({
  planName: {
    type: String,
    require: true,
  },
  plan: {
    type: Number,
    require: true,
    unique: true,
  },
  free: {
    type: Boolean,
    default: false,
  },
  premium: {
    type: Boolean,
    default: false,
  },
});

const Plans = mongoose.model("plans", plansSchema);

module.exports = Plans;
