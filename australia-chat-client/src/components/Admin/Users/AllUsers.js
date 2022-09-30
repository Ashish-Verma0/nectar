import React, { useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UserItem from "./UserItem";
import SnackbarComponet from "./../ReUsableComponent/SnackbarComponet";

const AllUsers = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [users, setUser] = useState([]);
  const page = 1;
  const [totalUser, setTotalUser] = useState("");
  const limit = 10;
  // const []=useState(true)
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(
        `/api/v1/admin/user/getAllUser/${limit}/${page}`
      );
      // console.log(res);
      setUser(res.data.user);
      setTotalUser(res.data.totalUser);
    };
    fetchUsers();
  }, []);
  const fun = async (e, pageNo) => {
    // setPage(pageNo)
    const res = await axios.get(
      `/api/v1/admin/user/getAllUser/${limit}/${pageNo}`
    );
    // console.log(res);
    setUser(res.data.user);
  };
  const blockUserApi = async (id) => {
    try {
      const res = await axios.get(`/api/v1/admin/user/blockUser/${id}`);
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };

  const unBlockUserApi = async (id) => {
    try {
      const res = await axios.get(`/api/v1/admin/user/unBlockUser/${id}`);
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };
  return (
    <>
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <h3 className="mt-4">All Users</h3>
      <div
        className={`row p-2 shadow m-0 d-flex justify-content-evenly ${styles.userHead}`}
      >
        <div className={`col-4 p-0 ${styles.allUsersFont}`}>Full Name</div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.hiden}`}
        >
          I Identify As
        </div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont} ${styles.hiden}`}
        >
          Phone Number
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          User ID
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Status
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Views
        </div>
      </div>

      {users.map((element, index) => {
        return (
          <UserItem
            user={element}
            key={element._id}
            blockUserApi={blockUserApi}
            unBlockUserApi={unBlockUserApi}
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
    </>
  );
};

export default AllUsers;
