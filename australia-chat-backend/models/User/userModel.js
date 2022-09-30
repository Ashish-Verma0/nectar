const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    profilePhoto: {
      type: String,
      // required: true,
    },
    userId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      // required: true,
    },
    dob: {
      type: String,
      // required: true,
    },
    iIdentifyAs: {
      type: String,
      // gender
      // required: true,
    },
    myInterests: {
      type: Array,
    },
    lookingFor: {
      type: String,
    },
    yourStarSign: {
      type: String,
    },
    readyFor: {
      type: String,
    },
    moreAboutMe: {
      traditional: Number,
      spontaneous: Number,
      spiritual: Number,
      socialButterfly: Number,
      height: Number,
      age: Number,
      smoker: Boolean,
      drinker: Boolean,
    },
    myIdealMatch: {
      traditional: Number,
      spontaneous: Number,
      spiritual: Number,
      socialButterfly: Number,
      height: {
        start: Number,
        end: Number,
      },
      age: {
        start: Number,
        end: Number,
      },
    },
    location: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ["Point"], // 'location.type' must be 'Point'
        // default: "point",
        required: true,
      },
      coordinates: {
        type: [Number],
        // index: "2dsphere",
        required: true,
      },
    },
    selfie: {
      type: String,
    },
    fullBody: {
      type: String,
    },
    fullBodyVerify: {
      type: Boolean,
      default: false,
    },
    selfieVerify: {
      type: Boolean,
      default: false,
    },
    iWantToSwipe: {
      type: String,
    },
    yourPlan: {
      type: String,
      enum: ["free", "premium"],
      default: "free",
    },
    planDuration: {
      type: String,
      enum: ["none", "weekly", "monthly", "quarterly", "yearly"],
      default: "none",
    },
    planExpire: {
      type: Date,
    },
    email: {
      type: String,
    },
    emailConfirm: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    phoneConfirm: {
      type: Boolean,
      default: false,
    },
    userVerifyed: {
      type: Boolean,
      default: false,
    },
    userblocked: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      select: false,
    },
    userStatus: {
      type: String,
      default: "InActive",
    },
    videoBio: {
      type: String,
    },
    videoBioVerifyed: {
      type: Boolean,
      default: false,
    },
    photos: [
      {
        photoKey: String,
        visibility: {
          type: Boolean,
          default: true,
        },
      },
      { timestamps: true },
    ],
    questions: [
      {
        type: String,
      },
    ],
    oldProfilePhotos: [
      {
        type: String,
      },
    ],
    like: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
    dislike: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
    otherLike: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
    otherDislike: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
    matches: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
    skippedUser: [
      {
        type: mongoose.Types.ObjectId,
        ref: "userModel",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ location: "2dsphere" });
// UserSchema.index({ userId: 1, location: "2dsphere" });
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
