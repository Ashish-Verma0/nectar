import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import styles from "./UserList.module.css";
import AllUserModal from "./all users/AllUserModal";
import UserModel from "./userModel/UserModel";

const UserItem = ({ user, key, unBlockUserApi, blockUserApi }) => {
  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  return (
    <>
      <UserModel
        user={user}
        modal={modal}
        setModal={setModal}
        unBlockUserApi={unBlockUserApi}
        blockUserApi={blockUserApi}
      />
      <div
        className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
        key={key}
      >
        <div
          className={`col-4 align-self-center  p-0 ${styles.paginationAllUsersFont}`}
        >
          {user.selfie ? (
            <img
              src={`/api/v1/user-media/user-profile/${user.selfie}`}
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
          <div className="align-self-center">{user.name}</div>
        </div>
        {/* <div className={`col-3 m-0 p-0 ${styles.paginationAllUsersFont}`}>
   </div> */}

        <div
          className={`col-1 align-self-center d-flex justify-content-evenly p-0 ${styles.paginationAllUsersFont} ${styles.hiden}`}
        >
          {user.iIdentifyAs}
        </div>
        <div
          className={`col-2 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont} ${styles.hiden}`}
        >
          {user.phone}
        </div>
        <div
          className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
        >
          {user.userId}
        </div>
        <div
          className={`col-1 p-0 align-self-center  d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
          style={
            user.userVerifyed
              ? {
                  color: "#28c76f",
                  backgroundColor: "#e5f8ee",
                  borderRadius: "10px",
                }
              : {
                  color: "#ff5858",
                  backgroundColor: "#ffd4d4",
                  borderRadius: "10px",
                }
          }
        >
          {user.userVerifyed ? "Active" : "InActive"}
        </div>

        <div
          className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
        >
          <i onClick={() => handleOpenModal()}>
            <VisibilityIcon />
          </i>
        </div>
      </div>

      {/* <div>

        {
          modal === true ? <AllUserModal hide={() => setModal(false)}  unBlockUserApi={unBlockUserApi}
            blockUserApi={blockUserApi} name={user.name} img=
            {user.selfie} Interest={user.myInterests} Dob={user.dob} Questions={user} Photos={user.photos} Meet={user.lookingFor} Relationship={user.readyFor} AboutMe={user.moreAboutMe} Plan={user.yourPlan} PlanType={user.planDuration} Expire={user.planExpire} Location={user.location.coordinates} Block={user.userblocked}
          /> : ""
        }

      </div> */}
    </>
  );
};

export default UserItem;
