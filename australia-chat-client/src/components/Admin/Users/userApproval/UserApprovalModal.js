// import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import ModalPhoto from "./ModalPhoto";
import ModalBioVideo from "./ModalBioVideo";
import ModalAction from "./ModalAction";
const UserApprovalModal = (props) => {
  const [modalIndex, setModalIndex] = useState(0);

  return (
    <Modal
      show={props.openModal}
      onHide={props.handleClose}
      animation={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <div className="row">
        <div className="col-12 d-flex justify-content-end  ">
          <h3
            style={{ cursor: "pointer" }}
            onClick={props.handleClose}
            className="me-2 mt-2"
          >
            X
          </h3>
        </div>
        <div className="col-12 text-center  mt-3">
          <h4>User Approval</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center mb-3">
          <p>User Profile Image and Video Bio Approval</p>
        </div>
      </div>
      <div className="row p-3 mb-5">
        <div className="col-4" style={{ cursor: "pointer" }}>
          <div className="row" onClick={() => setModalIndex(0)}>
            <div className="col-4">
              {modalIndex === 0 ? (
                <img src="/images/modal/photoModal-blue.svg" alt="" />
              ) : (
                <img src="/images/modal/photoModal.svg" alt="" />
              )}
            </div>
            <div className="col-8 p-0">
              <h5 className=" m-0">Photos</h5>
              <h6>Enter username</h6>
            </div>
          </div>
          <div className="row" onClick={() => setModalIndex(1)}>
            <div className="col-4">
              {modalIndex === 1 ? (
                <img src="/images/modal/videoModal-blue.svg" alt="" />
              ) : (
                <img src="/images/modal/videomodal.svg" alt="" />
              )}
            </div>
            <div className="col-8 p-0">
              <h5 className=" m-0">Video Bio</h5>
              <h6>Enter Information</h6>
            </div>
          </div>
          <div className="row" onClick={() => setModalIndex(2)}>
            <div className="col-4">
              {modalIndex === 2 ? (
                <img src="/images/modal/actionModal-blue.svg" alt="" />
              ) : (
                <img src="/images/modal/actionModal.svg" alt="" />
              )}
            </div>
            <div className="col-8 p-0">
              <h5 className=" m-0">Action</h5>
              <h6>Payment details</h6>
            </div>
          </div>
        </div>
        <div className="col-1">
          <div
            style={{
              height: "130px",
              width: "1px",
              backgroundColor: "black",
            }}
          ></div>
        </div>
        <div className="col-7">
          {modalIndex === 0 ? (
            <ModalPhoto
              user={props.user}
              selfieVerify={props.selfieVerify}
              setSelfieVerify={props.setSelfieVerify}
              fullBodyVerify={props.fullBodyVerify}
              setFullBodyVerify={props.setFullBodyVerify}
            />
          ) : modalIndex === 1 ? (
            <ModalBioVideo
              user={props.user}
              videoBioVerifyed={props.videoBioVerifyed}
              setVideoBioVerifyed={props.setVideoBioVerifyed}
            />
          ) : modalIndex === 2 ? (
            <ModalAction
              user={props.user}
              submitHandle={props.submitHandle}
              approveHandle={props.approveHandle}
              selfieVerify={props.selfieVerify}
              fullBodyVerify={props.fullBodyVerify}
              videoBioVerifyed={props.videoBioVerifyed}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UserApprovalModal;
