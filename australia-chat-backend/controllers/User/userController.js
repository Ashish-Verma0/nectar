const User = require("../../models/User/userModel");

exports.setUserLocation = async () => {};

exports.iWantToSwipe = async (req, res) => {
  try {
    const { userId } = req.params;
    const { iWantToSwipe } = req.body;

    const user = await User.findById(userId);
    if (user) {
      user.iWantToSwipe = iWantToSwipe;
      await user.save();
      res
        .status(200)
        .json({ success: "success", message: "Updated successfully" });
    } else {
      res.status(404).json({ success: "not found", message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.likeUser = async () => {
  const { userId } = req.params;
  const { likeUserId } = req.body;

  const user = await User.findById(userId);

  const otherUser = await User.findById();
  user.like.push(likeUserId);
  otherUser.otherLike.push(userId);
  await user.save();
  await otherUser.save();
  return user;
};

exports.desLikeUser = async () => {
  const { userId } = req.params;
  const { likeUserId } = req.body;
  const user = await User.findById(userId);
  const otherUser = await User.findById();
  user.dislike.push(likeUserId);
  otherUser.otherDislike.push(userId);
  await user.save();
  await otherUser.save();
  return user;
};

exports.getMatchesUser = async () => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  const otherUser = await User.findById();
  user.dislike.push(likeUserId);
  otherUser.otherDislike.push(userId);
  await user.save();
  await otherUser.save();
  return user;
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
