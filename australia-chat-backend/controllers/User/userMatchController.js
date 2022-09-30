const User = require("./../../models/User/userModel");
const Plans = require("./../../models/Plans/plansModel");
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

exports.getUsersToShowOnInlimit = async (req, res) => {
  try {
    const { userId, limit, page } = req.params;
    const skip = page * limit - limit;
    const user = await User.findById(userId);
    // console.log(user.myIdealMatch.traditional, user.moreAboutMe.traditional);
    if (user) {
      user.skippedUser.push(user._id);
      const users = await User.find({
        location: {
          $near: {
            $maxDistance: 40075000,
            $geometry: {
              type: "Point",
              coordinates: user.location.coordinates,
            },
          },
        },
        "moreAboutMe.traditional": { $eq: user.myIdealMatch.traditional },
        "moreAboutMe.spontaneous": { $eq: user.myIdealMatch.spontaneous },
        "moreAboutMe.spiritual": { $eq: user.myIdealMatch.spiritual },
        "moreAboutMe.socialButterfly": {
          $eq: user.myIdealMatch.socialButterfly,
        },
        "moreAboutMe.height": {
          $gte: user.myIdealMatch.height.start,
          $lte: user.myIdealMatch.height.end,
        },
        "moreAboutMe.age": {
          $gte: user.myIdealMatch.age.start,
          $lte: user.myIdealMatch.age.end,
        },
      })
        .where("_id")
        .nin(user.skippedUser)
        .limit(limit)
        .skip(skip)
        .exec();

      res.status(200).json({
        status: "success",
        message: "Successfully",
        users,
      });
    } else {
      res.status(404).json({ status: "not found", message: "user Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.skippedUser = async (req, res) => {
  try {
    const { skippedUser, userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      user.skippedUser.push(skippedUser);
      await user.save();
      res.status(200).json({ status: "success", message: "done" });
    } else {
      res.status(404).json({ status: "not found ", message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.likeUser = async (req, res) => {
  try {
    const { userId, likedUserId } = req.body;
    const user = await User.findById(userId);
    const likeUser = await User.findById(likedUserId);

    if (user && likeUser) {
      const plan = await Plans.findOne({ plan: 0 });
      if (
        !(
          likeUser.matches.includes(user._id) &&
          user.matches.includes(likeUser._id)
        )
      ) {
        if (user.yourPlan === "free") {
          if (plan.free) {
            if (!user.like.includes(likeUser._id)) {
              user.like.push(likeUser._id);
              likeUser.otherLike.push(user._id);
              await user.save();
              await likeUser.save();
              if (likeUser.skippedUser.includes(user._id)) {
                likeUser.skippedUser.pull(user._id);
                await likeUser.save();
              } else {
              }
              res.status(200).json({
                status: "success",
                message: "user liked successfully",
              });
            } else {
              res
                .status(409)
                .json({ status: "conflict", message: "user already liked" });
            }
          } else {
            res.status(203).json({
              status: "success",
              message: "You need to upgrade to Premium plan to like users",
            });
          }
        } else if (user.yourPlan === "premium") {
          if (plan.premium) {
            if (!user.like.includes(likeUser._id)) {
              user.like.push(likeUser._id);
              likeUser.otherLike.push(user._id);
              await user.save();
              await likeUser.save();
              if (likeUser.skippedUser.includes(user._id)) {
                likeUser.skippedUser.pull(user._id);
                await likeUser.save();
              } else {
              }
              res.status(200).json({
                status: "success",
                message: "user liked successfully",
              });
            } else {
              res
                .status(409)
                .json({ status: "conflict", message: "user already liked" });
            }
          } else {
            res.status(203).json({
              status: "success",
              message: "This feature is not available",
            });
          }
        } else {
          res
            .status(500)
            .json({ status: "error", message: "some this in not working " });
        }
      } else {
        res.status(409).json({
          status: "already ",
          message: "You already matched this user",
        });
      }
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getUsersLiked = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const likedList = await User.find().where("_id").in(user.like);
    res
      .status(200)
      .json({ status: "success", message: "successfully", likedList });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getUsersMatches = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const matchesList = await User.find().where("_id").in(user.matches);
    res
      .status(200)
      .json({ status: "success", message: "successfully", matchesList });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.whoLikedYou = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    const whoLikedYouList = await User.find().where("_id").in(user.otherLike);
    res
      .status(200)
      .json({ status: "success", message: "successfully", whoLikedYouList });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.matchUser = async (req, res) => {
  try {
    const { userId, matchUserId } = req.body;
    const user = await User.findById(userId);
    const matchUser = await User.findById(matchUserId);

    if (user && matchUser) {
      if (
        !(
          matchUser.matches.includes(user._id) &&
          user.matches.includes(matchUser._id)
        )
      ) {
        if (matchUser.like.includes(user._id)) {
          if (user.like.includes(matchUser._id)) {
            user.like.pull(matchUser._id);
          } else {
          }
          if (matchUser.like.includes(user._id)) {
            matchUser.like.pull(user._id);
          } else {
          }
          user.matches.push(matchUser._id);
          matchUser.matches.push(user._id);
          await user.save();
          await matchUser.save();
          res
            .status(200)
            .json({ status: "success", message: "successfully matched" });
        } else {
          res.status(401).json({
            status: "error",
            message: `You cannot match user because ${matchUser.name} not like you.`,
          });
        }
      } else {
        res.status(409).json({
          status: "already ",
          message: "You already matched this user",
        });
      }
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.unMatchUser = async (req, res) => {
  const { userId, unMatchUserId } = req.body;
  const user = await User.findById(userId);
  const unMatchUser = await User.findById(unMatchUserId);
  if (user && unMatchUser) {
    user.matches.pull(unMatchUser._id);
    unMatchUser.matches.pull(user._id);
    await user.save();
    await unMatchUser.save();
    res
      .status(200)
      .json({ status: "success", message: "successfully unMatched user" });
  } else {
    res.status(404).json({ status: "not found", message: "user not found" });
  }
};

exports.findMyMateADate = async (req, res) => {
  try {
    const { userId, profileUserId, friendPhoneNo } = req.body;
    const user = await User.findById(userId);
    const profileUser = await User.findById(profileUserId);
    if (profileUser && user) {
      const plan = await Plans.findOne({ plan: 12 });
      if (user.yourPlan === "free") {
        if (plan.free) {
          // client.messages
          //   .create({
          //     body: `Your friend ${user.name} has find
          //   a mate for you. Do check it
          //   on nectar Click on http://192.168.29.202:8080/api/v1/users/getUser/${profileUser._id}`,
          //     to: `+91${friendPhoneNo}`,
          //     from: `${process.env.TWILIO_NUMBER}`,
          //   })
          //   .then((message) => console.log(message))
          //   .catch((err) => console.log(err));
          console.log(`Your friend ${user.name} has find
a mate for you. Do check it
on nectar Click on http://192.168.29.202:8080/api/v1/users/getUser/${profileUser._id}`);
          console.log(
            "Cupid is playing match maker, and referred you to a potential date... lets wait and see"
          );

          res.status(200).json({
            status: "success",
            message: "SMS sended to the Given Phone Number",
          });
        } else {
          res.status(203).json({
            status: "success",
            message: "You need to upgrade to Premium plan to Use this feature",
          });
        }
      } else if (user.yourPlan === "premium") {
        if (plan.premium) {
          // client.messages
          //   .create({
          //     body: `Your friend ${user.name} has find
          // a mate for you. Do check it
          // on nectar Click on http://192.168.29.202:8080/api/v1/users/getUser/${profileUser._id}`,
          //     to: `+91${friendPhoneNo}`,
          //     from: `${process.env.TWILIO_NUMBER}`,
          //   })
          //   .then((message) => console.log(message))
          //   .catch((err) => console.log(err));

          console.log(`Your friend ${user.name} has find
a mate for you. Do check it
on nectar Click on http://192.168.29.202:8080/api/v1/users/getUser/${profileUser._id}`);
          console.log(
            "Cupid is playing match maker, and referred you to a potential date... lets wait and see"
          );
          res.status(200).json({
            status: "success",
            message: "SMS sended to the Given Phone Number",
          });
        } else {
          res.status(203).json({
            status: "success",
            message: "This feature is not available",
          });
        }
      } else {
        res
          .status(500)
          .json({ status: "error", message: "some this in not working " });
      }
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      res.status(200).json({ success: "success", message: "success", user });
    } else {
      res.status(404).json({ status: "not found", message: "user not found" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
