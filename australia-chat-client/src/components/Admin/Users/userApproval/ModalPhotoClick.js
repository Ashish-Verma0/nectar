import React, { useEffect, useState } from "react";
// import "./ModalData.css";
import axios from "axios";
const ModalData = ({ close, photo }) => {
  //   const [data, setData] = useState({
  //     img: "abc",
  //     video: "",
  //     approve: "",
  //   });
  //   let modelStyle = {
  //     display: "block",
  //     backgroundColor: "rgba(0, 0, 0, 0.8)",
  //   };
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
          </div>
          {/* Photos section */}
          {/* <div className="section">
            <div className="main-list"> */}
          <img
            src={`/api/v1/user-media/user-verify${photo}`}
            style={{ width: "100%" }}
          />
          {/* </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalData;
