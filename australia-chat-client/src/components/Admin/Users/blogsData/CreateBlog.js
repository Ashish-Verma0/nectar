import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "../blogsData/Blog.css";
import axios from "axios";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";
import Button from "@mui/material/Button";

const CreateBlog = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const editorConfig = {
    buttons: [
      "bold",
      "italic",
      "underline",
      "link",
      "unlink",
      "strikethrough",
      "eraser",
      "ul",
      "ol",
      "font",
      "fontsize",
      "paragraph",
      "classSpan",
      "lineHeight",
      "superscript",
      "subscript",
      "file",
      "image",
      "video",
      "cut",
      "copy",
      "paste",
      "selectall",
      "copyformat",
      "hr",
      "symbol",
      "left",
      "brush",
      "undo",
      "redo",
      "find",
      "source",
      "fullsize",
      "preview",
    ],
  };

  const titleRef = useRef(null);
  const editorRef = useRef(null);

  const [imgData, setImgData] = useState({
    file: [],
  });

  const handleImgChange = (e) => {
    setImgData({
      ...imgData,
      file: e.target.files[0],
    });
  };

  const handleImgSubmit = (id) => {
    let formData2 = new FormData();
    formData2.append("blogImg", imgData.file);
    axios
      .post(`/api/v1/media/blog-post-img/${id}`, formData2, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setImgData({ file: [] });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      title: titleRef.current.value,
      message: editorRef.current.value,
    };
    console.log(dataToSend);

    try {
      const res = await axios.post("/api/v1/admin/blog/createBlog", dataToSend);
      if (imgData !== null && res.data.blog._id) {
        handleImgSubmit(res.data.blog._id);
      }
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
      titleRef.current.value = null;
      editorRef.current.value = null;
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="ms-4">
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <h2 className="mt-5 mx-4">Blogs</h2>
      <div className="main-input container">
        <div className=" main-input bold mt-5">
          <div className="row mb-4">
            <span>Title</span>
            <input
              className="form-control form-control-lg col-12 my-2 mx-2"
              type="text"
              placeholder="Enter blog title"
              style={{ width: "90%" }}
              ref={titleRef}
              required
            />
          </div>
          <div className="row ">
            <label className="form-label" htmlFor="customFile">
              Upload Photos
            </label>
            <input
              type="file"
              className="form-control col-12 ms-2"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              style={{ width: "100%" }}
              onChange={handleImgChange}
            />
          </div>
        </div>
        <div className="mt-5 ms-0">
          <label className="form-label" htmlFor="textAreaExample2">
            Write your blog
          </label>
          <div className=" main-message form-outline">
            <JoditEditor ref={editorRef} config={editorConfig} />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button
          className={"ms-4"}
          variant={"contained"}
          style={{ backgroundColor: "#7367F0" }}
          type="submit"
        >
          Publish
        </Button>
      </div>
    </form>
  );
};

export default CreateBlog;
