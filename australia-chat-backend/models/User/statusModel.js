const mongoose = require("mongoose");
const statusSchema = new mongoose.Schema({});

const UserStatus = mongoose.model("UserStatus", statusSchema);

module.exports = UserStatus;
