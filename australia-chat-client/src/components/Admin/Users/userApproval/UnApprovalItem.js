import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./UnApprovalItem.module.css";
import { Form } from "react-bootstrap";

import UserApprovalModal from "./UserApprovalModal";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";
import axios from "axios";
const UserList = (props) => {
  const [message, setMessage] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [openApprovalModal, setOpenApprovalModal] = useState(false);
  const handleClose = () => {
    setOpenApprovalModal(false);
    setVerifyData();
  };

  const [selfieVerify, setSelfieVerify] = useState(props.user.selfieVerify);
  const [fullBodyVerify, setFullBodyVerify] = useState(
    props.user.fullBodyVerify
  );
  const [videoBioVerifyed, setVideoBioVerifyed] = useState(
    props.user.videoBioVerifyed
  );
  const setVerifyData = () => {
    setSelfieVerify(props.user.selfieVerify);
    setFullBodyVerify(props.user.fullBodyVerify);
    setVideoBioVerifyed(props.user.videoBioVerifyed);
  };
  const submitHandle = async () => {
    try {
      const data = {
        id: props.user._id,
        selfieVerify,
        fullBodyVerify,
        videoBioVerifyed,
      };
      const res = await axios.post(
        "/api/v1/admin/user/getAllUser/toAprove/notification/reupload",
        data
      );
      setMessage(res.data.message);
      setOpenSnackbar(true);
      setOpenApprovalModal(false);
      props.refreshuserData();
      // await setVerifyData();
    } catch (error) {
      // console.log(error);
    }
  };
  const approveHandle = async () => {
    try {
      const data = {
        id: props.user._id,
        selfieVerify,
        fullBodyVerify,
        videoBioVerifyed,
        userVerifyed: true,
      };
      const res = await axios.post(
        "/api/v1/admin/user/getAllUser/toAprove/approve",
        data
      );

      setMessage(res.data.message);
      setOpenSnackbar(true);
      setOpenApprovalModal(false);
      setOpenApprovalModal(false);
      props.refreshuserData();
      await setVerifyData();
    } catch (error) {
      // console.log(error);
    }
  };

  const openModalHandler = () => {
    setOpenApprovalModal(true);
  };
  return (
    <div
      className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
      key={props.user._id}
    >
      <SnackbarComponet
        message={message}
        severity={"success"}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />

      <UserApprovalModal
        user={props.user}
        selfieVerify={selfieVerify}
        setSelfieVerify={setSelfieVerify}
        fullBodyVerify={fullBodyVerify}
        setFullBodyVerify={setFullBodyVerify}
        videoBioVerifyed={videoBioVerifyed}
        setVideoBioVerifyed={setVideoBioVerifyed}
        openModal={openApprovalModal}
        setOpenModal={setOpenApprovalModal}
        handleClose={handleClose}
        submitHandle={submitHandle}
        approveHandle={approveHandle}
      />
      <div
        className={`col-4 align-self-center  p-0 ${styles.paginationAllUsersFont}`}
      >
        {props.user.selfie ? (
          <img
            src={`/api/v1/user-media/user-profile/${props.user.selfie}`}
            width="40px"
            className={`pe-2  ${styles.paginationAllUsersFontImg}`}
            alt="Not Found"
          />
        ) : (
          <img
            src="/images/user-solid.svg"
            width="40px"
            className={`pe-2  ${styles.paginationAllUsersFontImg}`}
            alt="not found"
          />
        )}
        <div className="align-self-center">{props.user.name}</div>
      </div>
      {/* <div className={`col-3 m-0 p-0 ${styles.paginationAllUsersFont}`}>
   </div> */}
      <div
        className={`col-1 align-self-center d-flex justify-content-evenly p-0 ${styles.paginationAllUsersFont}`}
      >
        {props.user.userId}
      </div>
      <div
        className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {props.user.selfieVerify ? (
          <Form.Check disabled checked />
        ) : (
          <Form.Check disabled />
        )}
      </div>
      <div
        className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {props.user.fullBodyVerify ? (
          <Form.Check disabled checked />
        ) : (
          <Form.Check disabled />
        )}
      </div>
      <div
        className={`col-1 p-0 align-self-center  d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {props.user.videoBioVerifyed ? (
          <Form.Check disabled checked />
        ) : (
          <Form.Check disabled />
        )}
      </div>
      <div
        className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        <i onClick={openModalHandler}>
          <VisibilityIcon />
        </i>
      </div>
    </div>
  );
};
export default UserList;
