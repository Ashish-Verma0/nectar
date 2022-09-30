const adminModel = require("../../../models/Admin/adminModel");
const UserAdmin = require("../../../models/Admin/UserAdmin");
const AdminPermission = require("../../../models/Admin/AdminPermission");
exports.autoGetApproved = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminModel.findOne(
      { _id: id },
      { _id: 0, autoApproved: 1 }
      // { _id: 0, name: 0, email: 0, photo: 0, password: 0 }
    );
    if (admin) {
      res.status(200).send({ admin });
    } else {
      res.status(204).send({ message: "Content is not Found By this ID" });
    }
  } catch {}
};

exports.autoPostApproved = async (req, res) => {
  try {
    const { id } = req.params;
    await adminModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
        runValidators: true,
      },
      async (err, admin) => {
        if (err) {
          res.status(406).send({ error: err.kind + " required" });
        } else {
          res
            .status(206)
            .send({ autoApproved: admin.autoApproved, message: "updated" });
        }
      }
    );
  } catch {}
};

exports.userPermissionGet = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await adminModel.findById({ _id: id }, { _id: 1 }).populate({
      path: "userAdminPermission",
      select: "name email permission",
      populate: {
        path: "permission",
        select: "permissionName -_id",
      },
    });
    res.status(200).send({ admin, message: "All permission fetched" });
  } catch {}
};

exports.userPermissionPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, permission: bpermission } = req.body;
    const userpermission = new UserAdmin({ name, email, password });
    for (let per of bpermission) {
      const createPermission = new AdminPermission({
        permissionName: per.permissionName,
        userPermission: userpermission._id,
      });
      userpermission.permission.push(createPermission._id);
      await createPermission.save();
    }
    const admin = await adminModel.findById(id);
    admin.userAdminPermission.push(userpermission._id);
    await admin.save();
    await userpermission.save();
    res
      .status(201)
      .send({ userpermission, message: "Created one User for Permission" });
  } catch {}
};
