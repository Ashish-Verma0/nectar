const express = require("express");
const blogController = require("../../controllers/Admin/blogController");
const auth = require("./../../controllers/Admin/auth");

const router = express.Router();

router.post("/createBlog", auth.protect, blogController.createBlog);
router.get("/getallBlog/:limit/:page", auth.protect, blogController.getallBlog);

module.exports = router;
