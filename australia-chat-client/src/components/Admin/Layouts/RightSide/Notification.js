import React from "react";
import styels from "./Notification.module.css";

const Notification = () => {
  const date = new Date().getDate();
  const month = new Date().getMonth();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div
      className="p-0 my-4 shadow-lg bg-body  "
      style={{ borderRadius: "15px" }}
    >
      <div className="row ">
        <div className="col-3 text-center p-2 ps-4 ">
          <h5>{date}</h5>
          <h5>{months[month]}</h5>
        </div>
        <div className="col-1 p-2">
          <div
            style={{
              alignItems: "center",
              backgroundColor: " rgb(235, 233, 241)",
              height: "50px",
              marginTop: " 5px",
              marginBottom: "5px",
              width: "1.5px",
            }}
          ></div>
        </div>
        <div className="col-7 p-2 ">
          <h5>Notifications</h5>

          <h6>Send Notification to Users</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <textarea
            className={`${styels.notificationTextArea}`}
            placeholder="Write a message"
            rows="10"
            col="60"
          ></textarea>
        </div>
        <div className="mt-lg-2 ml-2 mb-lg-4">
          <button className={`btn btn-lg ${styels.notificationButton}`}>
            Send Notification
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
