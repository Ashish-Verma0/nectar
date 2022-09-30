import React, { useEffect, useState } from "react";
import styles from "./UserApproval.module.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UnApprovalItem from "./UnApprovalItem";
import Visibility from "@mui/icons-material/Visibility";
import AllUserModal from "../all users/AllUserModal";
const UserApproval = () => {
  const [refreshUserDataPage, setRefreshUserDataPage] = useState(1);

  const [users, setUsers] = useState([]);
  // const page = 1;
  const [totalUser, setTotalUser] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `/api/v1/admin/user/getAllUser/toAprove/${limit}/${refreshUserDataPage}`
      );

      // console.log(res);
      setUsers(res.data.user);

      setTotalUser(res.data.totalUser);
    };
    fetchUsers();
  }, []);
  const fun = async (e, pageNo) => {
    // setPage(pageNo)
    setRefreshUserDataPage(pageNo);
    const res = await axios.get(
      `/api/v1/admin/user/getAllUser/toAprove/${limit}/${pageNo}`
    );

    // console.log(res);
    setUsers(res.data.user);
  };

  const refreshuserData = async () => {
    try {
      const res = await axios.get(
        `/api/v1/admin/user/getAllUser/toAprove/${limit}/${refreshUserDataPage}`
      );
      setUsers(res.data.user);
      // console.log("refreshuserData");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <>
      <h3 className="mt-4">User Approval</h3>
      <div
        className={`row p-2 shadow m-0 d-flex justify-content-evenly ${styles.userHead}`}
      >
        <div className={`col-4 p-0 ${styles.allUsersFont}`}>Full Name</div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.iconn}`}
        >
          User ID
        </div>
        <div className={`${styles.icon}`}>
          <Visibility />
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.iconn}`}
        >
          Selfie
        </div>
        <div className={`${styles.icon}`}>
          <Visibility />
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.iconn}`}
        >
          Body
        </div>
        <div className={`${styles.icon}`}>
          <Visibility />
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.iconn}`}
        >
          Bio
        </div>
        <div className={`${styles.icon}`}>
          <Visibility />
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.iconn}`}
        >
          View
        </div>
        <div className={`${styles.icon}`}>
          <Visibility />
        </div>
      </div>

      {users.map((element) => {
        return (
          <UnApprovalItem
            user={element}
            refreshuserData={refreshuserData}
            key={element._id}
          />
        );
      })}

      <div className="mt-5 mb-5 d-flex justify-content-end align-items-end ">
        <Stack spacing={2}>
          <Pagination
            onChange={fun}
            count={
              Math.trunc(totalUser / limit) +
              (totalUser % limit === 0 ? +0 : +1)
            }
            color="primary"
          />
        </Stack>
      </div>
      <div>
      </div>
    </>
  );
};

export default UserApproval;
