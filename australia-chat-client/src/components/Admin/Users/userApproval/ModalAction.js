import React, { useState } from "react";
import { Button } from "react-bootstrap";
import style from "./ModalAction.module.css";

const ModalAction = (props) => {
  const [approvalButton, setApprovalButton] = useState(false);
  const approvalButtonhandle = () => {
    setApprovalButton(true);
  };
  const disApprovalButtonhandle = () => {
    setApprovalButton(false);
  };
  return (
    <>
      {props.selfieVerify && props.fullBodyVerify && props.videoBioVerifyed ? (
        <div
          className="row  pt-3  "
          style={{
            width: "70%",
            height: "70%",
            borderRadius: "10px",
            backgroundColor: "#F3F3F3",
          }}
        >
          <div onClick={approvalButtonhandle} class="form-check col-12">
            <input
              type="radio"
              className={`${style.radio}`}
              name="approve"
              id="approve"
            />
            <label class="form-check-label ps-3" for="approve">
              Approve
            </label>
          </div>
          <div onClick={disApprovalButtonhandle} class="form-check col-12">
            <input
              className={`${style.radio}`}
              type="radio"
              name="approve"
              id="Disapprove"
              defaultChecked={true}
            />
            <label class="form-check-label ps-3" for="Disapprove">
              Disapprove
            </label>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <p>
              You have not Approve {props.selfieVerify ? "" : "Selfie,"}{" "}
              {props.fullBodyVerify ? "" : "Full Body,"}
              {props.videoBioVerifyed ? "" : "Video Bio,"} if You Submit. User
              will get Notification to ReTake
            </p>
          </div>
        </div>
      )}
      <div
        className="row pt-3"
        style={{
          width: "70%",
          height: "auto",
        }}
      >
        {props.selfieVerify &&
        props.fullBodyVerify &&
        props.videoBioVerifyed ? (
          approvalButton ? (
            <Button
              onClick={props.approveHandle}
              style={{
                backgroundColor: "#7367F0",
                border: "none",
                color: "#fff",
              }}
            >
              Approve
            </Button>
          ) : (
            <Button
              disabled
              style={{
                backgroundColor: "#7367F0",
                border: "none",
                color: "#fff",
              }}
            >
              Approve
            </Button>
          )
        ) : (
          <Button
            onClick={props.submitHandle}
            style={{
              backgroundColor: "#7367F0",
              border: "none",
              color: "#fff",
            }}
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default ModalAction;
