import React, { useEffect, useState } from "react";
import User from "./User";
import axios from "axios";
import styles from "./UserPermission.module.css";
import AddNewUser from "./AddNewUser";
import Visibility from "@mui/icons-material/Visibility";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";

const UserPermission = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`/api/v1/admin/getAllAdmins`);
      // console.log(res);
      setUsers(res.data.admin);
      // setTotalUser(res.data.totalUser);
    };
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(`/api/v1/admin/getAllAdmins`);
    // console.log(res);
    setUsers(res.data.admin);
    // setTotalUser(res.data.totalUser);
  };

  return (
    <>
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <h4 className="mt-4 ms-2 mb-4" style={{ color: "#606060" }}>
        User Admin Permission
      </h4>
      <div className="mainn-container mt-2 pe-4">
        <div className="row pt-2 pb-2" style={{ backgroundColor: "#F3F2F7" }}>
          <div className={`col-4`}>Name</div>
          <div className={`col-4 ${styles.iconn}`}>Email</div>
          <div className={`${styles.icon}`}>
            <Visibility />
          </div>
          <div className={`col-2 ${styles.iconn}`}>Designation</div>
          <div className={`${styles.icon}`}>
            <Visibility />
          </div>
          <div className={`col-2 ${styles.iconn}`}>Action</div>
          <div className={`${styles.icon}`}>
            <Visibility />
          </div>
        </div>
        {users.map((user, index) => (
          <User
            fetchUsers={fetchUsers}
            user={user}
            setOpenSnackbar={setOpenSnackbar}
            setMessage={setMessage}
            setSeverity={setSeverity}
            key={index}
          />
        ))}
      </div>
      <h4 className="mt-4 ms-2" style={{ color: "#606060" }}>
        Add a New User
      </h4>
      <div className={"bg-body pb-4"}>
        <div className="mt-4 ms-4 p-4" sx={{ width: "100%" }}>
          <div mx={4} sx={{ borderBm: 1, borderColor: "divider" }}>
            <AddNewUser fetchUsers={fetchUsers} />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPermission;

/*


import React, { useEffect, useState, useReducer } from "react";
import AddNewUser from "./AddNewUser";
import styles from "./UserPermission.module.css";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_USER_PERMISSION": {
      return state.push(action.val);
    }
    default: {
      return state;
    }
  }
};

const UserPermission = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [permissionState, dispatch] = useReducer(reducerFunction, [
    {
      name: "Ankush",
      email: "ankush@gmail.com",
      permission: ["User Approval", "Approve", "Edit page"],
    },
  ]);

  // console.log("THis is add dispatch", permissionState);

  useEffect(() => {
    setCurrentUser([
      {
        name: "Ankush",
        email: "ankush@gmail.com",
        permission: ["User Approval", "Approve", "Edit page"],
      },
      {
        name: "Birta",
        email: "Birta@gmail.com",
        permission: ["User Approval", "Disapprove", "Edit page"],
      },
    ]);
  }, []);
  return (
    <>
      <h4 className="mt-4">User Permission</h4>

      <div className="row mt-2">
        <h6>Current Users:</h6>
      </div>
      <div className="row my-2">
        <div className="col-4">
          <h6>Name</h6>
        </div>
        <div className="col-5">
          <h6>Email Address</h6>
        </div>
      </div>

      {currentUser &&
        currentUser.map((val, index) => (
          <div className="row my-3" key={index}>
            <div className="col-4">
              <p>{val.name}</p>
            </div>
            <div className={`col-4 ${styles.main}`}>
              <p >{val.email}</p>
            </div>
            <div className="col-4">
              <div className={`btn px-4 py-2 ${styles.userPermissionButton}`}>
                Manage
              </div>
            </div>
          </div>
        ))}

      <AddNewUser dispatch={dispatch} />
    </>
  );
};

export default UserPermission;



*/
