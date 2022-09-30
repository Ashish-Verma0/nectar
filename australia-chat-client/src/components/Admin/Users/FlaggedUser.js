import React, { useState, useEffect } from "react";
import styles from "./FlaggedUser.module.css";
const FlaggedUser = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    setUser([
      {
        remove: "/images/trash-2.svg",
        flagReason: "Flag Reason",
        time: "9 months ago",
        flaggedUserId: "0001",
        flaggedByUserId: "ehgfhsdgghf1323f",
        userCopy: "/images/copy.svg",
      },
      {
        remove: "/images/trash-2.svg",
        flagReason: "Flag Reason",
        time: "9 months ago",
        flaggedUserId: "0002",
        flaggedByUserId: "ehgfhsdgghf1323f",
        userCopy: "/images/copy.svg",
      },
      {
        remove: "/images/trash-2.svg",
        flagReason: "Flag Reason",
        time: "9 months ago",
        flaggedUserId: "0003",
        flaggedByUserId: "ehgfhsdgghf1323fd",
        userCopy: "/images/copy.svg",
      },
    ]);
  }, []);
  return (
    <>
      <div className="row mb-3">
        <h1 className="mt-4">Flagged User</h1>
      </div>
      <div className="row p-0 m-0">
        <div className={`col-2 p-0 ${styles.allFlaggedUsersFont}`}>
          Flagged User ID
        </div>
        <div className={`col-3 p-0 ${styles.allFlaggedUsersFont}`}>
          Flag Region
        </div>
        <div className={`col-2 p-0 ${styles.allFlaggedUsersFont}`}>Time</div>
        <div className={`col-3 p-0 ${styles.allFlaggedUsersFont}`}>
          Flagged by User ID
        </div>
        <div className={`col-1 p-0 ${styles.allFlaggedUsersFont}`}>Remove</div>
      </div>
      {users &&
        users.map((user) => (
          <div className="row p-0 my-3" key={user.flaggedUserId}>
            <div className={`col-2 p-0 ${styles.allFlaggedUsersFont1}`}>
              {user.flaggedUserId}{" "}
              <img
                src={user.userCopy}
                alt="not found"
                className={styles.allFlaggedUsersIcon}
              />
            </div>
            <div className={`col-3 p-0 ${styles.allFlaggedUsersFont1}`}>
              {user.flagReason}
            </div>
            <div className={`col-2 p-0 ${styles.allFlaggedUsersFont1}`}>
              {user.time}
            </div>
            <div className={`col-3 p-0 ${styles.allFlaggedUsersFont1}`}>
              {user.flaggedByUserId} <img src={user.userCopy} alt="not found" />
            </div>
            <div className={`col-1 p-0 ${styles.allFlaggedUsersFont1}`}>
              <img
                src={user.remove}
                alt="not found"
                className={styles.allFlaggedUsersIcon}
              />
            </div>
          </div>
        ))}
    </>
  );
};

export default FlaggedUser;
