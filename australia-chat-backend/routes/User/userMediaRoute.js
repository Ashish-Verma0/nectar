const express = require("express");
const {
  getProfileImg,
  verifyPhotoUpload,
  uploadVideoBio,
  getVideo,
  editAndUploadVideoBio,
  postProfile,
} = require("../../controllers/User/userMediaController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp/" });

router.get("/user-profile/:key", getProfileImg);
router.get("/user-verify-selfie/:key", getProfileImg);
router.get("/user-verify-full-body/:key", getProfileImg);
router.get("/user-verify-bio-video/:key", getVideo);

router.post("/user-profile/:id", upload.single("user-profile"), postProfile);
router.post(
  "/user-verify-photos/:id",
  upload.fields([
    { name: "selfie", maxCount: 1 },
    { name: "fullBody", maxCount: 1 },
  ]),
  verifyPhotoUpload
);
router.post(
  "/user-verify-bio-video/:id",
  upload.single("video-bio"),
  uploadVideoBio
);

router.post(
  "/user-verify-bio-video-edit/:id",
  upload.single("video-bio"),
  editAndUploadVideoBio
);

module.exports = router;
