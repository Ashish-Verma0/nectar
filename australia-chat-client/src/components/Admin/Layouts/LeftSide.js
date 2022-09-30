import React from "react";
import styles from "./LeftSide.module.css";
import axios from "axios";
import { useSelector } from "react-redux";

const LeftSide = ({ dispatch, componentReducer, setRunEffect }) => {
  const adminData = useSelector((state) => state.admin);
  const logoutHandler = () => {
    localStorage.removeItem("aid");
    axios
      .get("/")
      .then((res) => {
        setRunEffect(true);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  return (
    <ul className={styles.leftSideUl}>
      <img
        className="d-none d-lg-flex"
        style={{
          marginTop: "35px",
          marginBottom: "35px",
          marginLeft: "10%",
          width: "80%",
        }}
        src="/images/logo-side.svg"
        alt="not found"
      />
      <img
        className="d-lg-none"
        style={{
          marginTop: "35px",
          marginBottom: "35px",
          marginLeft: "10%",
          width: "80%",
        }}
        src="/images/logo.svg"
        alt="not found"
      />
      {adminData.dashboard ? (
        <li
          onClick={() => dispatch({ type: "DASHBOARD", value: "dashboard" })}
          className={
            componentReducer.val === "dashboard" ? `${styles.leftSideLI}` : ""
          }
        >
          {componentReducer.val === "dashboard" ? (
            <img src="/images/dashboard-blue.svg" alt="not found" />
          ) : (
            <img src="/images/dashboard-grey.svg" alt="not found" />
          )}
          <small className="d-none d-lg-flex"> Dashboard</small>
        </li>
      ) : (
        ""
      )}
      {adminData.analysis ? (
        <li
          className={
            componentReducer.val === "analysis" ? `${styles.leftSideLI}` : ""
          }
          onClick={() => dispatch({ type: "ANALYSIS", value: "analysis" })}
        >
          {componentReducer.val === "analysis" ? (
            <img src="/images/analysis-blue.svg" alt="not found" />
          ) : (
            <img src="/images/analysis-grey.svg" alt="not found" />
          )}
          <small className="d-none d-lg-flex"> Analysis</small>
        </li>
      ) : (
        ""
      )}

      {adminData.users ? (
        <li
          className={
            componentReducer.val === "users" ? `${styles.leftSideLI}` : ""
          }
          onClick={() => dispatch({ type: "USERS", value: "users" })}
        >
          {componentReducer.val === "users" ? (
            <img src="/images/users-blue.svg" alt="not found" />
          ) : (
            <img src="/images/users.svg" alt="not found" />
          )}
          <small className="d-none d-lg-flex"> Users</small>
        </li>
      ) : (
        ""
      )}

      {/* <li
        className={
          componentReducer.val === "flaggedUsers" ? `${styles.leftSideLI}` : ""
        }
        onClick={() =>
          dispatch({ type: "FLAGGED_USER", value: "flaggedUsers" })
        }
      >
        {componentReducer.val === "flaggedUsers" ? (
          <img src="/images/flagged-blue.svg" alt="not found" />
        ) : (
          <img src="/images/flaged.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Flaged Users</small>
      </li> */}
      {adminData.plans ? (
        <li
          className={
            componentReducer.val === "plansUsers" ? `${styles.leftSideLI}` : ""
          }
          onClick={() =>
            dispatch({ type: "PLANS_CREDIT_MANAGEMENT", value: "plansUsers" })
          }
        >
          {componentReducer.val === "plansUsers" ? (
            <img src="/images/credit-blue.svg" alt="not found" />
          ) : (
            <img src="/images/credit.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex">Plans</small>
        </li>
      ) : (
        ""
      )}

      {adminData.notifications ? (
        <li
          className={
            componentReducer.val === "notifications"
              ? `${styles.leftSideLI}`
              : ""
          }
          onClick={() =>
            dispatch({ type: "NOTIFICATIONS", value: "notifications" })
          }
        >
          {componentReducer.val === "notifications" ? (
            <img src="/images/testimonial-blue.svg" alt="not found" />
          ) : (
            <img src="/images/testimonials.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex">Push Notifications</small>
        </li>
      ) : (
        ""
      )}

      {/* <li
        className={
          componentReducer.val === "websiteControl"
            ? `${styles.leftSideLI}`
            : ""
        }
        onClick={() =>
          dispatch({ type: "WEBSITE_CONTROL", value: "websiteControl" })
        }
      >
        {componentReducer.val === "websiteControl" ? (
          <img src="/images/website-blue.svg" alt="not found" />
        ) : (
          <img src="/images/website.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Website Control</small>
      </li> */}
      {/* <li
        className={
          componentReducer.val === "eventCreate" ? `${styles.leftSideLI}` : ""
        }
        onClick={() => dispatch({ type: "EVENT_CREATE", value: "eventCreate" })}
      >
        {componentReducer.val === "eventCreate" ? (
          <img src="/images/event-blue.svg" alt="not found" />
        ) : (
          <img src="/images/event.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Event Create</small>
      </li> */}
      {/* <li
        className={
          componentReducer.val === "paymentCycle" ? `${styles.leftSideLI}` : ""
        }
        onClick={() =>
          dispatch({ type: "PAYMENT_CYCLE", value: "paymentCycle" })
        }
      >
        {componentReducer.val === "paymentCycle" ? (
          <img src="/images/payment-blue.svg" alt="not found" />
        ) : (
          <img src="/images/payment.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Payment Cycle</small>
      </li> */}
      {adminData.userActivity ? (
        <li
          className={
            componentReducer.val === "userActivity"
              ? `${styles.leftSideLI}`
              : ""
          }
          onClick={() =>
            dispatch({ type: "USER_ACTIVITY", value: "userActivity" })
          }
        >
          {componentReducer.val === "userActivity" ? (
            <img src="/images/user-blue.svg" alt="not found" />
          ) : (
            <img src="/images/user.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex"> User Activity</small>
        </li>
      ) : (
        ""
      )}
      {adminData.userApproval ? (
        <li
          className={
            componentReducer.val === "userApproval"
              ? `${styles.leftSideLI}`
              : ""
          }
          onClick={() =>
            dispatch({ type: "USER_APPROVAL", value: "userApproval" })
          }
        >
          {componentReducer.val === "userApproval" ? (
            <img src="/images/user-approval-blue.svg" alt="not found" />
          ) : (
            <img src="/images/user-approval.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex"> User Approval</small>
        </li>
      ) : (
        ""
      )}

      {adminData.userPermission ? (
        <li
          className={
            componentReducer.val === "userPermission"
              ? `${styles.leftSideLI}`
              : ""
          }
          onClick={() =>
            dispatch({ type: "USER_PERMISSION", value: "userPermission" })
          }
        >
          {componentReducer.val === "userPermission" ? (
            <img src="/images/user-activity-blue.svg" alt="not found" />
          ) : (
            <img src="/images/user-activity.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex"> User Permission</small>
        </li>
      ) : (
        ""
      )}

      {adminData.blog ? (
        <li
          className={
            componentReducer.val === "blog" ? `${styles.leftSideLI}` : ""
          }
          onClick={() => dispatch({ type: "BLOG", value: "blog" })}
        >
          {componentReducer.val === "blog" ? (
            <img src="/images/blog-blue.svg" alt="not found" />
          ) : (
            <img src="/images/blog-grey.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex"> Blog</small>
        </li>
      ) : (
        ""
      )}

      {adminData.adminProfile ? (
        <li
          className={
            componentReducer.val === "adminProfile"
              ? `${styles.leftSideLI}`
              : ""
          }
          onClick={() =>
            dispatch({ type: "ADMIN_PROFILE", value: "adminProfile" })
          }
        >
          {componentReducer.val === "adminProfile" ? (
            <img src="/images/user-activity-blue.svg" alt="not found" />
          ) : (
            <img src="/images/user-activity.svg" alt="not found" />
          )}

          <small className="d-none d-lg-flex"> Admin Profile</small>
        </li>
      ) : (
        ""
      )}

      {/* <li
        className={
          componentReducer.val === "appSetting" ? `${styles.leftSideLI}` : ""
        }
        onClick={() => dispatch({ type: "APP_SETTINGS", value: "appSetting" })}
      >
        {componentReducer.val === "appSetting" ? (
          <img src="/images/setting-blue.svg" alt="not found" />
        ) : (
          <img src="/images/setting.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> App Settings</small>
      </li> */}

      {/* <li
        className={
          componentReducer.val === "prize" ? `${styles.leftSideLI}` : ""
        }
        onClick={() => dispatch({ type: "PRIZE", value: "prize" })}
      >
        {componentReducer.val === "prize" ? (
          <img src="/images/prize-blue.svg" alt="not found" />
        ) : (
          <img src="/images/prize.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Prize</small>
      </li> */}
      {/* <li
        className={
          componentReducer.val === "reporting" ? `${styles.leftSideLI}` : ""
        }
        onClick={() => dispatch({ type: "REPORTING", value: "reporting" })}
      >
        {componentReducer.val === "reporting" ? (
          <img src="/images/reporting-blue.svg" alt="not found" />
        ) : (
          <img src="/images/reporting.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Reporting</small>
      </li> */}
      <li
        className={
          componentReducer.val === "logout" ? `${styles.leftSideLI}` : ""
        }
        // onClick={() => dispatch({ type: "LOGOUT", value: "logout" })}
        onClick={logoutHandler}
      >
        {componentReducer.val === "logout" ? (
          <img src="/images/logout-blue.svg" alt="not found" />
        ) : (
          <img src="/images/logout.svg" alt="not found" />
        )}

        <small className="d-none d-lg-flex"> Logout</small>
      </li>
    </ul>
  );
};

export default LeftSide;
