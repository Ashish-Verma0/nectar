import React, { useState } from "react";
import styles from "./UserPermission.module.css";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import axios from "axios";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";

// api/v1/users/signUp

const AddNewUser = ({ dispatch, fetchUsers }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [designation, setDesignation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [dashboard, setDashboard] = useState(false);
  const [analysis, setAnalysis] = useState(false);
  const [users, setUsers] = useState(false);
  const [plans, setPlans] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [userActivity, setUserActivity] = useState(false);
  const [userApproval, setUserApproval] = useState(false);
  const [userPermission, setUserPermission] = useState(false);
  const [blog, setBlog] = useState(false);
  const [adminProfile, setAdminProfile] = useState(false);

  const handleDashboard = () => setDashboard(!dashboard);
  const handleAnalysis = () => setAnalysis(!analysis);
  const handleUsers = () => setUsers(!users);
  const handlePlans = () => setPlans(!plans);
  const handleNotifications = () => setNotifications(!notifications);
  const handleUserActivity = () => setUserActivity(!userActivity);
  const handleUserApproval = () => setUserApproval(!userApproval);
  const handleUserPermission = () => setUserPermission(!userPermission);
  const handleBlog = () => setBlog(!blog);
  const handleAdminProfile = () => setAdminProfile(!adminProfile);

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value === "1") setDashboard(!dashboard);
    if (value === "2") setAnalysis(!analysis);
    if (value === "3") setUsers(!users);
    if (value === "4") setPlans(!plans);
    if (value === "5") setNotifications(!notifications);
    if (value === "6") setUserActivity(!userActivity);
    if (value === "7") setUserApproval(!userApproval);
    if (value === "8") setUserPermission(!userPermission);
    if (value === "9") setBlog(!blog);
    if (value === "10") setAdminProfile(!adminProfile);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (password !== passwordConfirm) {
        // setPasswordValidator(false);
        setOpenSnackbar(true);
        setMessage("Password does not matched.");
        setSeverity("error");
      } else {
        const data = {
          name: name,
          email: email,
          designation: designation,
          password: password,
          passwordConfirm: passwordConfirm,
          permissions: {
            dashboard: dashboard,
            analysis: analysis,
            users: users,
            plans: plans,
            notifications: notifications,
            userActivity: userActivity,
            userApproval: userApproval,
            userPermission: userPermission,
            blog: blog,
            adminProfile: adminProfile,
          },
        };
        const res = await axios.post("/api/v1/admin/adminSignup", data);
        // console.log(res);
        setOpenSnackbar(true);
        setMessage(res.data.message);
        setSeverity("success");
        setName("");
        setEmail("");
        setDesignation("");
        setPassword("");
        setPasswordConfirm("");

        setDashboard(false);
        setAnalysis(false);
        setUsers(false);
        setPlans(false);
        setNotifications(false);
        setUserActivity(false);
        setUserApproval(false);
        setUserPermission(false);
        setBlog(false);
        setAdminProfile(false);
        fetchUsers();
      }
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
      console.log(error);
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
      <form onSubmit={handleSubmit}>
        <div className="row my-3">
          <div className="col-6">
            <h5 style={{ color: "#5E5873" }}>Name</h5>
          </div>
          <div className="col-6">
            <h5 style={{ color: "#5E5873" }}>Email Address</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              name="name"
              type="text"
              className={`form-control ${styles.addNewUserInput}`}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-6">
            <input
              name="email"
              type="email"
              className={`form-control ${styles.addNewUserEmail}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h5 style={{ color: "#5E5873" }}>Designation</h5>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input
                name="designation"
                type="text"
                className={`form-control ${styles.addNewUserEmail}`}
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <h5 style={{ color: "#5E5873" }}>Password</h5>
            </div>
            <div className="col-6">
              <h5 style={{ color: "#5E5873" }}>Confirm Password</h5>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-6">
              <input
                name="password"
                type="password"
                className={`form-control ${styles.addNewUserInput}`}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="col-6">
              <input
                name="passswordConfirm"
                type="password"
                className={`form-control ${styles.addNewUserEmail}`}
                placeholder="Confirm Password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-6">
              <h5 style={{ color: "#5E5873" }}>Select permission</h5>
            </div>
            <div className="col-12 mt-2">
              <select
                className={`form-select ${styles.addNewUserSelect}`}
                name="permission"
                required
                onChange={handleSelect}
              >
                <option className={` ${styles.addNewUserOption}`}>
                  Select permissions
                </option>
                {!dashboard && (
                  <option className={` ${styles.addNewUserOption}`} value="1">
                    Dashboard
                  </option>
                )}
                {!analysis && (
                  <option className={` ${styles.addNewUserOption}`} value="2">
                    Analysis
                  </option>
                )}
                {!users && (
                  <option className={` ${styles.addNewUserOption}`} value="3">
                    Users
                  </option>
                )}
                {!plans && (
                  <option className={` ${styles.addNewUserOption}`} value="4">
                    Plans
                  </option>
                )}
                {!notifications && (
                  <option className={` ${styles.addNewUserOption}`} value="5">
                    Notifications
                  </option>
                )}
                {!userActivity && (
                  <option className={` ${styles.addNewUserOption}`} value="6">
                    User Activity
                  </option>
                )}
                {!userApproval && (
                  <option className={` ${styles.addNewUserOption}`} value="7">
                    User Approval
                  </option>
                )}
                {!userPermission && (
                  <option className={` ${styles.addNewUserOption}`} value="8">
                    User Permission
                  </option>
                )}
                {!blog && (
                  <option className={` ${styles.addNewUserOption}`} value="9">
                    Blog
                  </option>
                )}
                {!adminProfile && (
                  <option className={` ${styles.addNewUserOption}`} value="10">
                    Admin Profile
                  </option>
                )}
              </select>
            </div>
            <div className={"bg-body mt-2"}>
              {dashboard && (
                <Chip
                  label="Dashboard"
                  onDelete={handleDashboard}
                  className="m-2"
                />
              )}
              {analysis && (
                <Chip
                  label="Analysis"
                  onDelete={handleAnalysis}
                  className="m-2"
                />
              )}
              {users && (
                <Chip label="Users" onDelete={handleUsers} className="m-2" />
              )}
              {plans && (
                <Chip label="Plans" onDelete={handlePlans} className="m-2" />
              )}
              {notifications && (
                <Chip
                  label="Notifications"
                  onDelete={handleNotifications}
                  className="m-2"
                />
              )}
              {userActivity && (
                <Chip
                  label="User Activity"
                  onDelete={handleUserActivity}
                  className="m-2"
                />
              )}
              {userApproval && (
                <Chip
                  label="User Approval"
                  onDelete={handleUserApproval}
                  className="m-2"
                />
              )}
              {userPermission && (
                <Chip
                  label="User Permission"
                  onDelete={handleUserPermission}
                  className="m-2"
                />
              )}
              {blog && (
                <Chip label="Blog" onDelete={handleBlog} className="m-2" />
              )}
              {adminProfile && (
                <Chip
                  label="Admin Profile"
                  onDelete={handleAdminProfile}
                  className="m-2"
                />
              )}
            </div>

            <Button
              className={"mx-5 my-4 w-50"}
              variant={"outlined"}
              style={{ backgroundColor: "#7367F0", color: "white" }}
              type="submit"
            >
              Send Invitation
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddNewUser;
