const mongoose = require("mongoose");
const UserAdmin = require("./UserAdmin");
const permissionSchema = new mongoose.Schema({
  permissionName: {
    type: String,
    required: true,
  },
  userPermission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserAdmin",
  },
});

module.exports = mongoose.model("AdminPermission", permissionSchema);
