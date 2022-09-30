import React, { useState, useEffect } from "react";
import styles from "./WebsiteControl.module.css";
const WebsiteControl = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    setState([
      {
        name: "Log In",
      },
      {
        name: "Register",
      },
      {
        name: "Home",
      },
      {
        name: "Message",
      },
      {
        name: "Likes",
      },
      {
        name: "Dislike",
      },
      {
        name: "Matches",
      },
      {
        name: "Edit Profile",
      },
      {
        name: "VIP Account",
      },
      {
        name: "Diary",
      },
      {
        name: "Events",
      },
      {
        name: "Prize Draw",
      },
      {
        name: "Single Services Packages",
      },
      {
        name: "About us",
      },
      {
        name: "Privacy Policy",
      },
      {
        name: "Terms & Condition",
      },
      {
        name: "Logout",
      },
    ]);
  }, []);
  return (
    <>
      <div className="row mb-3">
        <h2 className="mt-4">Website Control</h2>
      </div>
      <div className="row">
        <div className="col-sm-6 col-lg-8">
          <h5>Pages</h5>
        </div>
        <div className={`col-sm-3 col-lg-2 ${styles.websiteControlIcon}`}>
          <h5>Edit</h5>
        </div>
        <div className={`col-sm-3 col-lg-2 ${styles.websiteControlIcon}`}>
          <h5>Delete</h5>
        </div>
      </div>
      {state &&
        state.map((item, index) => (
          <div className="row" key={index}>
            <div className="col-sm-6 col-lg-8">
              <p>{item.name}</p>
            </div>
            <div className={`col-sm-3 col-lg-2 ${styles.websiteControlIcon}`}>
              <p>
                <img
                  className={styles.websiteControlImage}
                  src="/images/edit.svg"
                  alt="not found"
                />
              </p>
            </div>
            <div className={`col-sm-3 col-lg-2 ${styles.websiteControlIcon}`}>
              <p>
                <img
                  className={styles.websiteControlImage}
                  src="/images/trash-2.svg"
                  alt="not found"
                />
              </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default WebsiteControl;
