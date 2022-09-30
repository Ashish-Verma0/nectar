const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminPermission = require("./AdminPermission");
const permissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
  },
  permission: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminPermission",
    },
  ],
});

// permissionSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });
module.exports = mongoose.model("UserAdmin", permissionSchema);
