// const Photo = require("../../models/User/userPhoto");
const User = require("../../models/User/userModel");
const fs = require("fs");
const { uploadImg, getFileStream } = require("../../.config/client-s3");

exports.uploadPhoto = async (req, res) => {
  try {
    const file = req.file;

    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      const result = await uploadImg(file);
      console.log(result);
      const key = result.Key;
      user.photos.push({ photoKey: key });
      await user.save();
      fs.unlinkSync(file.path);
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
    console.log(e);
    res.status(500).json({ status: "Error", message: "Internal server error" });
  }
};

exports.getPhotos = async (req, res) => {
  try {
    const key = req.params.key;
    const readStream = getFileStream(key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
// exports.createPhoto = async ({ userInput }, req) => {
//   const { viewability, photoPath, userId } = userInput;
//   const newPhoto = await Photo.create({
//     viewability,
//     photoPath,
//     user: userId,
//   });
//   const user = await User.findById(userInput.uid);
//   user.photo.push(newPhoto._id);
//   const photo = await newPhoto.save();
//   user.save();
//   return photo;
// };
// exports.getOnePhoto = async ({ userInput }, req) => {
//   const photo = await Photo.findById(userInput.photoId);
//   return photo;
// };
// exports.getUserPhoto = async ({ userInput }, req) => {
//   try {
//     const photos = [];
//     const user = await User.findById(userInput.userId);
//     for (let i = 0; i < user.photo.length; i++) {
//       photos.push(await Photo.findById(user.photo[i]));
//     }
//     return photos;
//   } catch {
//     console.log("error");
//   }
// };
// exports.editPhoto = async ({ userInput }, req) => {
//   const { viewability, photoPath } = userInput;
//   const photo = await Photo.findByIdAndUpdate(userInput.photoId, {
//     viewability: viewability,
//     photoPath: photoPath,
//   });
//   return photo;
// };

// exports.deletePhoto = async ({ userInput }, req) => {
//   const photo = await Photo.findById(userInput.photoId);
//   const user = await User.findById(photo.user);
//   user.photo.pull(userInput.photoId);
//   await user.save();
//   await Photo.findByIdAndDelete(userInput.photoId);

//   return (message = "deleted");
// };

// exports.likePhoto = async ({ userInput }, req) => {
//   const { userId, photoId } = userInput;
//   const photo = await Photo.findById(photoId);
//   photo.like.push(userId);
//   await photo.save();
//   return (message = "Liked");
// };

// exports.disLikePhoto = async ({ userInput }, req) => {
//   const { userId, photoId } = userInput;
//   const photo = await Photo.findById(photoId);
//   photo.disLike.push(userId);
//   await photo.save();
//   return (message = "disLiked");
// };
