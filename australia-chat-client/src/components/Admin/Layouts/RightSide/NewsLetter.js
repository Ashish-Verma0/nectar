import React from "react";
import styles from "./NewsLetter.module.css";
const NewsLetter = () => {
  return (
    <div className="mx-lg-4 mt-3">
      <h5>News Letter</h5>
      <div className="row mb-2" style={{ width: "107%" }}>
        <div className={`col-10`}>
          <select className={`form-select  ${styles.newsLetterSelect}`}>
            <option defaultValue={"Select Users"}>Select Users</option>
            <option>User 1</option>
            <option>User 2</option>
            <option>User 3</option>
            <option>User 4</option>
          </select>
        </div>
        <div className={`col-2 ${styles.newsLetterImage}`}>
          <img src="/images/image.svg" alt="not found" />
        </div>
      </div>
      <div className="row mx-0">
        <textarea
          className={`${styles.newsLetterTextArea}`}
          placeholder="Write a message"
          rows="10"
          col="100"
        ></textarea>
      </div>
      <div className="row mt-lg-2 mb-lg-4">
        <div className="col-6  d-flex justify-content-start ">
          <button
            className={`btn btn-lg px-4 shadow-sm ${styles.newsLetterButtonCancel}`}
          >
            Cancel
          </button>
        </div>
        <div className="col-6  d-flex justify-content-end ">
          <button
            className={`btn btn-lg px-4 shadow-sm ${styles.newsLetterButtonSend}`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
