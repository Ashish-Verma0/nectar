import React, { useState } from "react";
import CreateBlog from "./CreateBlog";
import RecentBlog from "./RecentBlog";
import Button from "@mui/material/Button";

const Blog = () => {
  const [indexBlog, setIndexBlog] = useState(0);

  const handleClickBlogButton = () => {
    setIndexBlog(0);
  };
  const handleClickRecentBlogButton = () => {
    setIndexBlog(1);
  };
  return (
    <div>
      <div className="mt-5">
        <Button
          className={"ms-5 "}
          variant={indexBlog === 0 ? "contained" : "outlined"}
          style={
            indexBlog === 0
              ? { backgroundColor: "#7367F0" }
              : { color: "#7367F0" }
          }
          onClick={() => handleClickBlogButton()}
          // {...a11yProps(1)}
        >
          Create Blog
        </Button>
        {/* <button type="button" className="btn  me-5 border-dark" style={
          indexBlog === 0 ? { backgroundColor: "#7367F0" }
          : { color: "#7367F0" }
            // ? { backgroundColor: "#7367F0" }
            // : { color: "#7367F0" }
        }
          onClick={() => handleClickBlogButton()}>Create Blog</button> */}
        {/* <button
          type="button"
          className="btn border border-dark"
          style={
            indexBlog === 1
              ? { backgroundColor: "#7367F0" }
              : { color: "#7367F0" }
          }
          onClick={() => handleClickRecentBlogButton()}
        >
          Recent Blogs
        </button> */}
        <Button
          className={"ms-5 "}
          variant={indexBlog === 1 ? "contained" : "outlined"}
          style={
            indexBlog === 1
              ? { backgroundColor: "#7367F0" }
              : { color: "#7367F0" }
          }
          onClick={() => handleClickRecentBlogButton()}
          // {...a11yProps(1)}
        >
          Recent Blogs
        </Button>
      </div>
      <div>
        {indexBlog === 0 ? (
          <CreateBlog />
        ) : indexBlog === 1 ? (
          <RecentBlog />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Blog;
