import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import "./Notification.css";

const PreviousNotifications = ({ title, image, message, setData }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const editDataHandle = () => {
    setData({ title: title, message: message, image: image });
  };

  return (
    <>
      <div
        className="row py-2 mx-4 my-2 d-flex align-items-center shadow bg-body "
        style={{ borderRadius: 10 }}
      >
        <div className="col-2 mx-4 " style={{ cursor: "pointer" }}>
          {image ? (
            <img
              src={image ? `/api/v1/media/notification-img/${image}` : ""}
              alt=""
              onClick={handleShow}
              style={{ height: "50px", width: "50px" }}
              className="handleimg"
            />
          ) : (
            ""
          )}
        </div>
        <div className="col-7 mb-0">
          <strong>{title}</strong>
          <p className="mb-2">{message}</p>
        </div>
        <div className="col-1 ">
          <Button
            className={"mr-5 "}
            variant={"outlined"}
            style={{ backgroundColor: "#7367F0", color: "white" }}
            onClick={editDataHandle}
          >
            Edit
          </Button>
        </div>
        {/* <div className="col-2 ">
          <img alt="" src="/images/dustbin.svg" />
        </div> */}
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <img
              src={image ? `/api/v1/media/notification-img/${image}` : ""}
              alt="Notification Img"
              className="d-flex justify-content-center"
              width="100%"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PreviousNotifications;
