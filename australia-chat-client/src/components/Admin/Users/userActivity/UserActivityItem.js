import React from "react";
import styles from "./UserActivityItem.module.css";
const UserActivityItem = ({ user }) => {
  return (
    <div
      className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
      key={user._id}
    >
      <div
        className={`col-4 align-self-center  p-0 ${styles.paginationAllUsersFont}`}
      >
        {/* <img
        src={user.userPhoto}
        className={`pe-2  ${styles.paginationAllUsersFontImg}`}
        alt="not found"
      /> */}
        <div className="align-self-center">{user.name}</div>
      </div>
      {/* <div className={`col-3 m-0 p-0 ${styles.paginationAllUsersFont}`}>
    </div> */}
      <div
        className={`col-2 align-self-center d-flex justify-content-evenly p-0 ${styles.paginationAllUsersFont}`}
      >
        {user.userId}
      </div>
      <div
        className={`col-2 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {user.yourPlan}
      </div>
      <div
        className={`col-2 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {user.planDuration}
      </div>
      <div
        className={`col-2 p-0 align-self-center  d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
      >
        {user.planExpire}
      </div>
    </div>
  );
};
export default UserActivityItem;
