const Admin = require("../../models/Admin/adminModel");

exports.adminDashboard = async (req, res) => {
  try {
    console.log(req.params.aid);
    if (req.params.aid) {
      const admin = await Admin.findById(req.params.aid);
      if (admin) {
        admin.userAdminPermission = undefined;
        res.status(200).json({
          status: "success",
          admin,
        });
      } else {
        res.status(401).clearCookie("bearerToken").json({
          status: "unauthorized",
          message,
        });
      }
    } else {
      // console.log("hhhhhh");
      res.status(401).clearCookies("bearerToken").json({
        status: "unauthorized",
        message,
      });
    }
  } catch (e) {
    // console.log(e);
    res.status(500).clearCookie("bearerToken").json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const admin = await Admin.find();

    res.status(200).json({
      status: "success",
      admin,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

exports.deleteAdminUser = async (req, res) => {
  try {
    if (process.env.SUPERADMINID === req.params.id) {
      res.status(401).json({
        status: "conflict",
        message: "You cannot delete Super Admin",
      });
    } else {
      const admin = await Admin.findById(req.params.id);
      if (admin) {
        await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json({
          status: "success",

          message: "User Admin Deleted SuccessFully",

        });
      } else {
        res.status(404).json({
          status: "Not found",
          message: "User Admin not Found",
        });
      }
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({
      status: "error",

      message: "Internal server error",

    });
  }
};

exports.createAdmin = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};
