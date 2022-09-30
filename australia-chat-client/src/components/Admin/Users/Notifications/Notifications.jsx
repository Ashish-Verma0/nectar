import PreviousNotifications from "./PreviousNotifications";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import axios from "axios";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";

const Notifications = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [data, setData] = useState({
    title: "",
    image: "",
    message: "",
  });

  const [previousNotifications, setPreviousNotifications] = useState([]);

  const [imgData, setImgData] = useState({
    file: [],
  });

  const handleImgChange = (e) => {
    setImgData({
      ...imgData,
      file: e.target.files[0],
    });
  };

  const getallNotifications = async () => {
    try {
      const res = await axios.get(
        "/api/v1/admin/notifications/getallNotifications"
      );
      // console.log(res)
      setPreviousNotifications(res.data.notifications);
    } catch (error) {
      // console.log(error);
    }
  };
  useEffect(() => {
    getallNotifications();
  }, []);
  // console.log(previousNotifications);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImgSubmit = (id) => {
    let formData2 = new FormData();
    formData2.append("notiImg", imgData.file);
    // console.log(formData2);
    axios
      .post(`/api/v1/media/notification-img/${id}`, formData2, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log(res.data.message);
      });
    // console.log(data);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/notifications/createNotifications",
        data
      );
      // console.log(res.data.notifications._id);
      if (imgData !== null && res.data.notifications._id) {
        handleImgSubmit(res.data.notifications._id);
      }
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
      setData({ title: "", img: "", message: "" });
      getallNotifications();
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
    // console.log(res);
  };

  // const previousNotifications = [
  //   {
  //     id: 1,
  //     title: "title 1",
  //     image: "https://source.unsplash.com/500x500",
  //     message:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id repellendus magni aliquid modi ducimus vitae iure dist",
  //   },
  //   {
  //     id: 2,
  //     title: "title 2",
  //     image: "https://source.unsplash.com/500x500",
  //     message:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id repellendus magni aliquid modi ducimus vitae iure dist",
  //   },
  //   {
  //     id: 3,
  //     title: "title 3",
  //     image: "https://source.unsplash.com/500x500",
  //     message:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id repellendus magni aliquid modi ducimus vitae iure dist",
  //   },
  // ];

  return (
    <>
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <div className="mt-4 ms-2" style={{ color: "#606060" }}>
        Notifications
      </div>
      <div className={"bg-body mt-4"} style={{ borderRadius: 10 }}>
        <div className="mt-4 ms-4 p-4" sx={{ width: "100%" }}>
          <div mx={4} sx={{ borderBm: 1, borderColor: "divider" }}>
            <div className=" main-container">
              <div className="row">
                <div className="col-6 ">
                  <p>Title</p>
                </div>
                {/* <div className="col-6 ">
                  <p>Image(Optional)</p>
                </div> */}
              </div>
              <div className="row">
                <div className="main-row">
                  <div className="col-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Title"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                      name="title"
                      value={data.title}
                      required
                    />
                  </div>
                  <div className="col-6 mt-3">
                    <label>Image(optional)</label>
                    <div className="input-group ">
                      <input
                        type="file"
                        className="form-control"
                        id="customFile"
                        onChange={handleImgChange}
                        name="img"
                        // value={data.img}
                      />
                      {/* Add browse button here and style it */}
                    </div>
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
                      className="form-control"
                      placeholder="Enter Notification message"
                      id="floatingTextarea2"
                      style={{ height: 100 }}
                      minLength="6"
                      onChange={handleChange}
                      name="message"
                      value={data.message}
                    ></textarea>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p style={{ color: "#B9B9C3" }}>
                      Maximum Limit &nbsp;{data.message.length}/255 words.
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-4 d-flex justify-content-center ">
                    <Button
                      className={"mr-5 my-2"}
                      variant={"outlined"}
                      style={{ backgroundColor: "#7367F0", color: "white" }}
                      onClick={() => handleSubmit()}
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
      <div className="mt-4 ms-2 mb-4" style={{ color: "#606060" }}>
        Previous Notifications
      </div>
      <div className={"mb-4 py-4 shadow bg-body "} style={{ borderRadius: 5 }}>
        <div className="ms-4 mb-2" sx={{ width: "100%" }}>
          <div mx={4} sx={{ borderBm: 1, borderColor: "divider" }}></div>
        </div>

        {previousNotifications.map((notification, index) => (
          <PreviousNotifications
            key={index}
            title={notification.title}
            image={notification.image}
            message={notification.message}
            setData={setData}
          />
        ))}
      </div>
    </>
  );
};

export default Notifications;
