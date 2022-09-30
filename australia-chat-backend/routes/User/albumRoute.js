const express = require("express");
const albumController = require("../../controllers/User/albumController");
const router = express.Router();

router.post("/createAlbum", albumController.createAlbum);
router.post("/addPhotoInAlbum/:aid", albumController.addPhotoInAlbum);
router.post("/deletePhotoInAlbum/:aid", albumController.deletePhotoInAlbum);

router.post("/likeAlbum/:aid", albumController.likeAlbum);
router.post("/disLikeAlbum/:aid", albumController.disLikeAlbum);
router.get("/getOneAlbum/:aid", albumController.getOneAlbum);
router.get("/getUserAlbum/:uid", albumController.getUserAlbum);
router.patch("/editAlbum/:aid", albumController.editAlbum);
router.delete("/deleteAlbum/:aid", albumController.deleteAlbum);

module.exports = router;
