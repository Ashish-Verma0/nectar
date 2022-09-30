import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ModalPhotoClick from "./ModalPhotoClick";
const ModalPhoto = (props) => {
  const selfieVerifySwitch = (e) => {
    props.setSelfieVerify(e.target.checked);
  };
  const fullBodyVerifySwitch = (e) => {
    props.setFullBodyVerify(e.target.checked);
  };
  const [openSelfieModal, setOpenSelfieModal] = useState(false);
  const handleSelfiePhotoModal = () => {
    setOpenSelfieModal(!openSelfieModal);
  };
  const [openFullBodyModal, setOpenFullBodyModal] = useState(false);
  const handleFullBodyPhotoModal = () => {
    setOpenFullBodyModal(!openFullBodyModal);
  };
  return (
    <>
      <div className="row p-0 m-2 ms-0">
        <div className="col-6 d-flex justify-content-center ">
          {openSelfieModal && (
            <ModalPhotoClick
              close={handleSelfiePhotoModal}
              photo={`-selfie/${props.user.selfie}`}
            />
          )}

          <img
            src={
              props.user.selfie
                ? `/api/v1/user-media/user-verify-selfie/${props.user.selfie}`
                : "/images/notFound.png"
            }
            className="rounded"
            alt="selfie"
            width={"100rem"}
            onClick={props.user.selfie && handleSelfiePhotoModal}
          />
        </div>
        <div className="col-6 d-flex justify-content-center ">
          {openFullBodyModal && (
            <ModalPhotoClick
              close={handleFullBodyPhotoModal}
              photo={`-full-body/${props.user.fullBody}`}
            />
          )}
          <img
            className="rounded"
            src={
              props.user.fullBody
                ? `/api/v1/user-media/user-verify-full-body/${props.user.fullBody}`
                : "/images/notFound.png"
            }
            alt="Full Body"
            width={"100rem"}
            onClick={props.user.selfie && handleFullBodyPhotoModal}
          />
        </div>
      </div>
      <div className="row p-0 m-2 ms-0">
        <div className="col-6 d-flex justify-content-center">
          <h6>Selfie</h6>
        </div>
        <div className="col-6 d-flex justify-content-center">
          <h6>Full Body</h6>
        </div>
      </div>
      <div className="row p-0 m-2 ms-0">
        {props.user.selfie && (
          <div className="col-6 d-flex justify-content-center">
            {props.selfieVerify ? (
              <Form.Check
                type="switch"
                onClick={selfieVerifySwitch}
                defaultChecked={true}
              />
            ) : (
              <Form.Check type="switch" onClick={selfieVerifySwitch} />
            )}
          </div>
        )}
        {props.user.fullBody && (
          <div className="col-6 d-flex justify-content-center">
            {props.fullBodyVerify ? (
              <Form.Check
                type="switch"
                onClick={fullBodyVerifySwitch}
                defaultChecked={true}
              />
            ) : (
              <Form.Check type="switch" onClick={fullBodyVerifySwitch} />
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default ModalPhoto;
