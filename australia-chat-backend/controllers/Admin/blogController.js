const Blog = require("./../../models/Admin/BlogModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, message } = req.body;
    const blog = await Blog.create({ title, message });
    res.status(200).json({
      status: "success",

      message: "Successfully created blog",

      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
exports.getallBlog = async (req, res) => {
  try {
    const { limit, page } = req.params;
    const skip = page * limit - limit;
    const blog = await Blog.find().sort({ _id: -1 }).skip(skip).limit(limit);
    const totalBlog = await Blog.count();
    res.status(200).json({
      status: "success",
      totalBlog,
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
