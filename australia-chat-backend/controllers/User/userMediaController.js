const User = require("../../models/User/userModel");
const fs = require("fs");
const {
  uploadImg,
  uploadVideo,
  getFileStream,
  userProfileVerification,
  deleteFile,
} = require("../../.config/client-s3");

exports.verifyPhotoUpload = async (req, res) => {
  try {
    const file1 = req.files["selfie"][0];
    const file2 = req.files["fullBody"][0];
    const { id } = req.params;
    const userText = await User.findById(id);
    if (userText) {
      if (userText.selfie) {
        await deleteFile(userText.selfie);
      }
      if (userText.fullBody) {
        await deleteFile(userText.fullBody);
      }
      const selfieData = await uploadImg(file1);
      const fullBodyData = await uploadImg(file2);
      userText.selfie = selfieData.Key;
      userText.fullBody = fullBodyData.Key;
      await userText.save();
      fs.unlinkSync(file1.path);
      fs.unlinkSync(file2.path);
      res
        .status(200)
        .json({ status: "success", message: "User Verify Photos Updated." });
    } else {
      res.status(404).json({
        status: "not found",
        message: "User not found",
      });
    }
  } catch (e) {
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

exports.getProfileImg = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

exports.uploadVideoBio = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const userText = await User.findById(id);
    if (userText) {
      if (userText.videoBio) {
        await deleteFile(userText.videoBio);
      }
      const results = await uploadVideo(file);
      userText.videoBio = results.key;
      await userText.save();
      fs.unlinkSync(file.path);
      res
        .status(200)
        .json({ status: "success", message: "Video Uploaded SuccessFully" });
    } else {
      res.status(404).json({
        status: "not found",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.editAndUploadVideoBio = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const userText = await User.findById(id);
    if (userText) {
      if (userText.videoBio) {
        await deleteFile(userText.videoBio);
      }
      const results = await uploadVideo(file);
      userText.videoBio = results.key;
      userText.videoBioVerifyed = false;
      userText.userVerifyed = false;

      await userText.save();
      fs.unlinkSync(file.path);
    } else {
      res.status(404).json({
        status: "not found",
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

// Get Video
exports.getVideo = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    // console.log(readStream);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
exports.postProfile = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const userText = await User.findById(id);
    if (userText.profilePhoto) {
      userText.oldProfilePhotos.push(userText.profilePhoto);
    }
    const width = 480;
    const height = 480;
    const results = await uploadImg(file, width, height);
    userText.profilePhoto = results.key;
    await userText.save();
    fs.unlinkSync(file.path);
    res.json({ status: "success", message: "User Profile Updated" });
  } catch (e) {
    console.log(e);
  }
};
