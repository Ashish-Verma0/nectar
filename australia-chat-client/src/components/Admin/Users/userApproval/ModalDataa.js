import React, { useEffect, useState } from "react";
import style from "./ModalData.module.css";
import axios from "axios";
const ModalData = ({ dataa, close }) => {
  const [data, setData] = useState({
    img: "abc",
    video: "",
    approve: "",
  });
  let modelStyle = {
    display: "block",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  };
  return (
    <div className="modal" tabIndex="-1" style={modelStyle}>
      <div className="modal-dialog">
        <div className="modal-content ">
          <div className="heading modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => close()}
            ></button>
            <h3 className="modal-title">User Approval</h3>
            <h6 className="modal-title">
              User Profile Image and BioVideo Approval
            </h6>
          </div>
          {/* Photos section */}
          <div className="section">
            <div className="main-list">
              <ul className="list-group list-group-light">
                <li
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setData({ video: "", approve: "", img: "img" })
                  }
                >
                  Photos
                </li>
                <li
                  className="list-group-item m"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setData({ video: "abc", approve: "", img: "" })
                  }
                >
                  Video Bios
                </li>
                <li
                  className="list-group-item"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    setData({ video: "", approve: "abc", img: "" })
                  }
                >
                  Action
                </li>
              </ul>
            </div>
            {/* part 1 */}
            {data.img?.length > 1 && (
              <div className="main-img m-3">
                <div className="img">
                  <img
                    src={dataa?.fullBody}
                    alt="photo"
                    width="100px"
                    className="img1"
                  />
                  <span>fullBody</span>
                </div>

                <div className="img">
                  <img
                    src={dataa?.fullBody}
                    alt="photo"
                    width="100px"
                    className="img1"
                  />
                  <span>fullBody</span>
                </div>
              </div>
            )}
            {/* part 2  */}
            {data.video?.length > 1 && (
              <div className="m-3 video">
                <video width="320" height="240">
                  <source
                    src="/api/v1/media/video/da13527a7dcbd0a88b4039e140e6dde1"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            {/* part 3 */}
            {data.approve?.length > 1 && (
              <div className="approve m-3 ">
                <div>
                  <input type="checkbox" />
                  <span>Approval</span>
                </div>
                <div>
                  <input type="checkbox" />
                  <span>DisApproval</span>
                </div>
                <div>
                  <input
                    className="btn btn-primary mt-3"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </div>
            )}
          </div>
          {/* Photos section end */}
          {/* <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => close()}>Close</button> */}
        </div>
      </div>
    </div>
  );
};

export default ModalData;
