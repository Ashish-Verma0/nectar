const express = require("express");
const photoController = require("../../controllers/User/photoController");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "temp/" });

router.post(
  "/uploadPhoto/:id",
  upload.single("file"),
  photoController.uploadPhoto
);

router.get("/getPhotos/:key", photoController.getPhotos);

module.exports = router;
