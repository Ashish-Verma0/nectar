const mongoose = require("mongoose");

const premiumPriceSchema = new mongoose.Schema({
  premium: {
    type: String,
    required: true,
    default: "premium",
    emit: ["premium"],
    unique: true,
  },
  weekly: {
    type: Number,
    require: true,
    default: 1,
  },
  monthly: {
    type: Number,
    default: 1,
    require: true,
  },
  quaterly: {
    type: Number,
    default: 1,
    require: true,
  },
  yearly: {
    type: Number,
    default: 1,
    require: true,
  },
});

const PremiumPrice = mongoose.model("premiumPrice", premiumPriceSchema);

module.exports = PremiumPrice;
