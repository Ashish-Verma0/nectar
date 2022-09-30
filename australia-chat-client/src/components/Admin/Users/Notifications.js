import React, { useState } from "react";
import Button from "@mui/material/Button";

const Notifications = () => {
  const [messageWordLimit, setMessageWordLimit] = useState(0);
  const handleTextArea = (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    messageWordLimit > 255
      ? setMessageWordLimit(255)
      : setMessageWordLimit(e.target.value.length);
  };
  return (
    <div className={"bg-body"}>
      <div className="mt-4 ms-4 p-4" sx={{ width: "100%" }}>
        <div mx={4} sx={{ borderBm: 1, borderColor: "divider" }}>
          <div className="container">
            <div className="row">
              <div className="col-6 ">
                <p>Title</p>
              </div>
              <div className="col-6 ">
                <p>Image(Optional)</p>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Title"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    id="inputGroupFileAddon04"
                    style={{ backgroundColor: "#7367F0", color: "white" }}
                  >
                    Browse
                  </button>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-12 ht-12">
                  <p>Message</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <textarea
                    maxLength={255}
                    className="form-control"
                    placeholder="Enter Notification message"
                    id="floatingTextarea2"
                    style={{ height: 100 }}
                    onChange={handleTextArea}
                  ></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p style={{ color: "#B9B9C3" }}>
                    Character limit {messageWordLimit}/255.
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-12 mt-4 d-flex justify-content-center ">
                  <Button
                    className={"mr-5 my-2"}
                    variant={"outlined"}
                    style={{ backgroundColor: "#7367F0", color: "white" }}
                  >
                    Send Notifications
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
