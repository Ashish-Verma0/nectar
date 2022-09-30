import React from "react";
import styles from "./WebEmail.module.css";
import { IoToggle } from "react-icons/io5";
const WebEmail = () => {
  return (
    <div className="mx-lg-4 mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5>Welcome Email</h5>
        <div className={styles.webEmailDivToggle}>
          <IoToggle className={styles.webEmailToggle} />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <p style={{ fontSize: "12px" }}>
          Send Automatically Welcome email to new user!
        </p>
      </div>

      <div className="row mx-0">
        <textarea
          className={`${styles.webEmailTextArea}`}
          placeholder=""
          rows="10"
          col="100"
        ></textarea>
      </div>
      <div className="row mt-lg-2 mb-lg-4">
        <div className="col-6  d-flex justify-content-start ">
          <button
            className={`btn btn-lg px-4 shadow-sm ${styles.webEmailButtonCancel}`}
          >
            Cancel
          </button>
        </div>
        <div className="col-6  d-flex justify-content-end ">
          <button
            className={`btn btn-lg px-4 shadow-sm ${styles.webEmailButtonSend}`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebEmail;
