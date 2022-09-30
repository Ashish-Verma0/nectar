const albumPhoto = require("../../models/User/albumPhotoModel");
const Album = require("../../models/User/albumModel");
const User = require("../../models/User/userModel");

exports.createAlbum = async (req, res) => {
  const { viewability, albumName } = req.body;
  const newAlbum = await Album.create({
    viewability,
    albumName,
    user: req.body.uid,
  });
  const user = await User.findById(req.body.uid);
  await user.album.push(newAlbum._id);
  const album = await newAlbum.save();
  user.save();
  res.status(201).json({
    status: "success",
    data: album,
  });
};
exports.addPhotoInAlbum = async (req, res) => {
  const { aid } = req.params;
  const { pid } = req.body;
  const album = await Album.findById(aid);
  album.photo.push(pid);
  await album.save();
  res.status(201).json({
    status: "success",
    data: album,
  });
};

exports.deletePhotoInAlbum = async (req, res) => {
  const { aid } = req.params;
  const { pid } = req.body;
  const album = await Album.findById(aid);
  album.photo.pull(pid);
  await album.save();
  res.status(201).json({
    status: "success",
    data: album,
  });
};

exports.getOneAlbum = async (req, res) => {
  const album = await Album.findById(req.params.aid);
  res.status(201).json({
    status: "success",
    data: album,
  });
};
exports.getUserAlbum = async (req, res) => {
  try {
    const albums = [];
    const user = await User.findById(req.params.uid);
    for (let i = 0; i < user.album.length; i++) {
      albums.push(await Album.findById(user.album[i]));
    }
    res.status(201).json({
      status: "success",
      data: albums,
    });
  } catch {
    console.log("error");
  }
};
exports.editAlbum = async (req, res) => {
  const { viewability, albumName } = req.body;
  const album = await Album.findByIdAndUpdate(req.params.aid, {
    viewability: viewability,
    albumName: albumName,
  });
  res.status(201).json({
    status: "success",
    data: album,
  });
};

exports.deleteAlbum = async (req, res) => {
  const album = await Album.findById(req.params.aid);
  const user = await User.findById(album.user);
  for (let i = 0; i < album.photo.length; i++) {
    albumPhoto.findByIdAndDelete(album.photo[i]);
  }
  await user.album.pull(req.params.aid);
  await user.save();
  await Album.findByIdAndDelete(req.params.aid);

  res.status(201).json({
    status: "success",
    message: "deleted",
  });
};

exports.likeAlbum = async (req, res) => {
  const { uid } = req.body;
  const { aid } = req.params;
  const album = await Album.findById(aid);
  await album.like.push(uid);
  await album.save();
  res.status(201).json({
    status: "success",
    data: album,
  });
};

exports.disLikeAlbum = async (req, res) => {
  const { uid } = req.body;
  const { aid } = req.params;
  const album = await Album.findById(aid);
  await album.disLike.push(uid);
  await album.save();
  res.status(201).json({
    status: "success",
    data: album,
  });
};
