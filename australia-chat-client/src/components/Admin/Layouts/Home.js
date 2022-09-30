import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import Main from "./Main";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthAdminActions } from "../../redux/admin-dash";
import styles from "./Home.module.css";

const Home = ({ children, dispatch, componentReducer, setRunEffect }) => {
  const storDispatch = useDispatch();

  useEffect(() => {
    const aid = localStorage.getItem("aid");
    axios
      .get(`/api/v1/admin/adminDashboard/${aid}`)
      .then((res) => {
        storDispatch(
          AuthAdminActions.adminDashboard({
            name: res.data.admin.name,
            photo: res.data.admin.photo,
            email: res.data.admin.email,
            designation: res.data.admin.designation,
            dashboard: res.data.admin.permissions.dashboard,
            analysis: res.data.admin.permissions.analysis,
            users: res.data.admin.permissions.users,
            plans: res.data.admin.permissions.plans,
            notifications: res.data.admin.permissions.notifications,
            userActivity: res.data.admin.permissions.userActivity,
            userApproval: res.data.admin.permissions.userApproval,
            userPermission: res.data.admin.permissions.userPermission,
            blog: res.data.admin.permissions.blog,
            adminProfile: res.data.admin.permissions.adminProfile,
          })
        );
      })
      .catch((e) => {
        localStorage.removeItem("aid");
        setRunEffect(true);
        // console.log("hsjkahjk");
      });
  });

  return (
    <div className="row p-0 m-0">
      <div
        className={`col-2 col-lg-2 p-0 m-0 shadow-lg bg-body  ${styles.leftLine}`}
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <LeftSide
          dispatch={dispatch}
          componentReducer={componentReducer}
          setRunEffect={setRunEffect}
        />
      </div>
      <div
        style={{ backgroundColor: "#f8f8f8" }}
        className="col-10 col-lg-7 p-0 m-0"
      >
        <Main children={children} />
      </div>
      <div
        className="d-none d-lg-flex col-lg-3"
        style={{ backgroundColor: "#f8f8f8" }}
      >
        <RightSide componentReducer={componentReducer} />
      </div>
    </div>
  );
};

export default Home;
