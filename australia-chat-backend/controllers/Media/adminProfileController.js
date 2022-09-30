const fs = require("fs");
const {
  uploadImg,
  uploadSimpleImg,
  uploadVideo,
  getFileStream,
  deleteFile,
} = require("../../.config/client-s3");
// Import Models:-
const Admin = require("../../models/Admin/adminModel");
const Blog = require("../../models/Admin/BlogModel");
const Notifications = require("../../models/Admin/NotificationsModel");

exports.postProfileImg = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const adminText = await Admin.findById(id);
    if (adminText.photo) {
      await deleteFile(adminText.photo);
    }
    const width = 480;
    const height = 480;
    const results = await uploadImg(file, width, height);
    adminText.photo = results.key;
    await adminText.save();
    fs.unlinkSync(file.path);
    res.json({ message: "Admin Profile Updated" });
  } catch (e) {
    console.log(e);
  }
};

//upload afile to s3

// get Photos

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.file;
    const results = await uploadVideo(file);
    res.send("Video Uploaded SuccessFully");
  } catch (error) {
    console.log(error);
  }
};

// Get Video
exports.getVideo = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};

// Upload Blog Img
exports.postBlogImg = async (req, res) => {
  try {
    const file = req.file;
    const { id } = req.params;
    const blogText = await Blog.findById(id);
    if (blogText.image) {
      await deleteFile(blogText.image);
    }
    console.log("delete Req Pass");
    const results = await uploadSimpleImg(file);
    blogText.image = results.key;
    await blogText.save();
    fs.unlinkSync(file.path);
    res.status(200).json({ message: "Blog Image Updated" });
  } catch (error) {}
};

// Upload Blog Img
exports.postNotiImg = async (req, res) => {
  try {
    console.log("rought Hit");
    const file = req.file;
    console.log(file);
    const { id } = req.params;
    const notiText = await Notifications.findById(id);
    if (notiText.image) {
      await deleteFile(notiText.image);
    }
    const results = await uploadSimpleImg(file);
    console.log(results);
    notiText.image = results.key;
    await notiText.save();
    // fs.unlinkSync(file.path);
    res.status(200).json({ message: "Notification Image Uploaded" });
  } catch (error) {}
};

// Get Img
exports.getImg = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
