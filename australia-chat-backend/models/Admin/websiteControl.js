const mongoose = require("mongoose");

const websiteSchema = new mongoose.Schema({
  login: {
    type: Boolean,
    default: true,
  },
  register: {
    type: Boolean,
    default: true,
  },
  home: {
    type: Boolean,
    default: true,
  },
  like: {
    type: Boolean,
    default: true,
  },
  dislike: {
    type: Boolean,
    default: true,
  },
  messages: {
    type: Boolean,
    default: true,
  },
  matches: {
    type: Boolean,
    default: true,
  },
  editProfile: {
    type: Boolean,
    default: true,
  },
  vipAccount: {
    type: Boolean,
    default: true,
  },
  dairy: {
    type: Boolean,
    default: true,
  },
  event: {
    type: Boolean,
    default: true,
  },
  prize: {
    type: Boolean,
    default: true,
  },
  ssPackage: {
    type: Boolean,
    default: true,
  },
  aboutUs: {
    type: Boolean,
    default: true,
  },
  privacyPolicy: {
    type: Boolean,
    default: true,
  },
  termAndCondition: {
    type: Boolean,
    default: true,
  },
  search: {
    type: Boolean,
    default: true,
  },
  filter: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("WebsiteContorl", websiteSchema);
