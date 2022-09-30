//
const User = require("./../../../models/User/userModel");

exports.getallUserWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const user = await User.find().sort({ _id: -1 }).skip(skip).limit(limit);
    const totalUser = await User.count();
    res.status(200).json({
      status: "success",
      totalUser,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.getallUserToAproveWithLimit = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const user = await User.find({ userVerifyed: false })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    const totalUser = await User.find({ userVerifyed: false }).count();
    res.status(200).json({
      status: "success",
      totalUser,
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.userNotificationSendForReUpload = async (req, res) => {
  try {
    const { id, selfieVerify, fullBodyVerify, videoBioVerifyed } = req.body;
    const user = await User.findById(id);
    if (user) {
      if (!selfieVerify) {
        console.log("notification sended mgs = reload Selfy");
      }
      if (!fullBodyVerify) {
        console.log("notification sended mgs = reload full body");
      }
      if (!videoBioVerifyed) {
        console.log("notification sended mgs = reload videoBio");
      }

      user.selfieVerify = selfieVerify;
      user.fullBodyVerify = fullBodyVerify;
      user.videoBioVerifyed = videoBioVerifyed;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "Notification sended to user",
        user,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.userFinalApproval = async (req, res) => {
  try {
    const { id, selfieVerify, fullBodyVerify, videoBioVerifyed, userVerifyed } =
      req.body;
    const user = await User.findByIdAndUpdate(id, {
      selfieVerify,
      fullBodyVerify,
      videoBioVerifyed,
      userVerifyed,
    });
    if (user) {
      res.status(200).json({
        status: "success",
        message: "User Approved",
        user,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.getallAnalysis = async (req, res) => {
  try {
    const totalUser = await User.count();
    const totalUnverifiedUser = await User.find({
      userVerifyed: false,
    }).count();
    const totalActiveUsers = await User.find({ userVerifyed: true }).count();
    const totalBlockedUsers = await User.find({ userblocked: true }).count();
    res.status(200).json({
      status: "success",
      totalUser,
      totalUnverifiedUser,
      totalActiveUsers,
      totalBlockedUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Error",
      message: "Internal Server Error",
    });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const query = req.params.query;
    if (query.length >= 3) {
      const user = await User.find({
        $or: [{ name: { $regex: query } }],
      }).limit(20);
      res.status(200).json({ status: "success", message: "Search Data", user });
    } else {
      res.status(200).json({ status: "success", message: "enter More text" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const blockId = req.params.blockId;
    const user = await User.findById(blockId);
    console.log(blockId);
    if (user) {
      user.userblocked = true;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "User Blocked successfully",
      });
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.unBlockUser = async (req, res) => {
  try {
    const unBlockId = req.params.unBlockId;
    const user = await User.findById(unBlockId);
    if (user) {
      user.userblocked = false;
      await user.save();
      res.status(200).json({
        status: "success",
        message: "User Unblocked successfully ",
      });
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
