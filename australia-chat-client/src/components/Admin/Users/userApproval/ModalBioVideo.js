import React from "react";
// import axios from "axios";
// import Switch from "@mui/material/Switch";
import { Form } from "react-bootstrap";

const ModalBioVideo = (props) => {
  const videoSwitch = (e) => {
    props.setVideoBioVerifyed(e.target.checked);
  };
  return (
    <>
      {props.user.videoBio ? (
        <>
          <div className="row p-0 m-2 ms-0">
            <div className="col-12 d-flex justify-content-center">
              <video width="320" height="240" controls>
                <source
                  src={`/api/v1/user-media/user-verify-bio-video/${props.user.videoBio}`}
                  type="video/mp4"
                  alt="video"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="row p-0 m-2 ms-0">
            <div className="col-12 d-flex justify-content-center">
              <h6>Click to play Video Bio</h6>
            </div>
          </div>
          <div className="row p-0 m-2 ms-0">
            <div className="col-12 d-flex justify-content-center">
              {props.videoBioVerifyed ? (
                // <Switch onChange={videoSwitch} defaultChecked />
                <Form.Check
                  type="switch"
                  onClick={videoSwitch}
                  defaultChecked={true}
                />
              ) : (
                // <Switch onChange={videoSwitch} />
                <Form.Check type="switch" onClick={videoSwitch} />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <img
            src="/images/videoNotFound.png"
            className="rounded "
            alt="selfie"
            width={"100rem"}
          />
        </div>
      )}
    </>
  );
};
export default ModalBioVideo;
