import React, { useReducer } from "react";
import { useSelector } from "react-redux";
import Home from "./Layouts/Home";
import AdminDashboard from "./Users/AdminDashboard";
import AllUsers from "./Users/AllUsers";
import Analysis from "./Users/Analysis";
// import FlaggedUser from "./Users/FlaggedUser";
// import WebsiteControl from "./Users/WebsiteControl";
import Blog from "./Users/blogsData/Blog";
import PlanCreditManagement from "./Users/PlanCreditManagement";
// import EventCreate from "./Users/EventCreate";
// import PaymentCycle from "./Users/PaymentCycle";
import UserActivity from "./Users/userActivity/UserActivity";
import UserApproval from "./Users/userApproval/UserApproval";
import UserPermission from "./Users/UserPermission/UserPermission";
// <<<<<<< HEAD
// import AppSettings from "./Users/AppSettings";
import AdminProfile from "./Users/admin Profile/AdminProfile";
import Notifications from "./Users/Notifications/Notifications";
// =======
// import AppSettings from "./Users/AppSettings";
// import AdminProfile from "./Users/admin Profile/AdminProfile";
// import Notifications from "./Users/Notifications/Notifications";
// >>>>>>> b8f1e009084cbddf589eac800a215d21bab06f4e
import Logout from "./Users/Logout";
// import Prize from "./Users/Prize";
// import Reporting from "./Users/Reporting";

const reducerFunction = (state, action) => {
  // state = "users";
  switch (action.type) {
    case "DASHBOARD": {
      return {
        val: action.value,
      };
    }
    case "ANALYSIS": {
      return {
        val: action.value,
      };
    }
    case "USERS": {
      return {
        val: action.value,
      };
    }
    // case "FLAGGED_USER": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "PLANS_CREDIT_MANAGEMENT": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "WEBSITE_CONTROL": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "EVENT_CREATE": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "PAYMENT_CYCLE": {
    //   return {
    //     val: action.value,
    //   };
    // }
    case "USER_ACTIVITY": {
      return {
        val: action.value,
      };
    }
    case "USER_APPROVAL": {
      return {
        val: action.value,
      };
    }
    case "BLOG": {
      return {
        val: action.value,
      };
    }
    // case "APP_SETTINGS": {
    //   return {
    //     val: action.value,
    //   };
    // }
    case "USER_PERMISSION": {
      return {
        val: action.value,
      };
    }
    case "ADMIN_PROFILE": {
      return {
        val: action.value,
      };
    }

    // case "TESTIMONIALS_REQUEST": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "PRIZE": {
    //   return {
    //     val: action.value,
    //   };
    // }
    // case "REPORTING": {
    //   return {
    //     val: action.value,
    //   };
    // }
    case "LOGOUT": {
      return {
        val: action.value,
      };
    }
    default: {
      return {
        val: action.value,
      };
    }
  }
  // if (action.type === "DASHBOARD") {
  //   return {
  //     val: action.value,
  //   };
  // }
};

const AllComponent = ({ setRunEffect }) => {
  const adminData = useSelector((state) => state.admin);

  // console.log(adminData);
  let defaultScreen = "";
  const setDefaultScreen = () => {
    if (adminData.dashboard && !defaultScreen) {
      defaultScreen = "dashboard";
      return "dashboard";
    } else if (adminData.analysis && !defaultScreen) {
      defaultScreen = "analysis";
      return "analysis";
    } else if (adminData.users && !defaultScreen) {
      defaultScreen = "users";
      return "users";
    } else if (adminData.plans && !defaultScreen) {
      defaultScreen = "plans";
      return "plans";
    } else if (adminData.notifications && !defaultScreen) {
      defaultScreen = "notifications";
      return "notifications";
    } else if (adminData.userActivity && !defaultScreen) {
      defaultScreen = "userActivity";
      return "userActivity";
    } else if (adminData.userApproval && !defaultScreen) {
      defaultScreen = "userApproval";
      return "userApproval";
    } else if (adminData.userPermission && !defaultScreen) {
      defaultScreen = "userPermission";
      return "userPermission";
    } else if (adminData.blog && !defaultScreen) {
      defaultScreen = "blog";
      return "blog";
    } else if (adminData.adminProfile && !defaultScreen) {
      defaultScreen = "adminProfile";
      return "adminProfile";
    } else {
      // console.log("error");
    }
  };

  const [componentReducer, dispatch] = useReducer(reducerFunction, {
    state: "dashboard",
    val: setDefaultScreen(),
  });
  // console.log(componentReducer);
  return (
    <Home
      dispatch={dispatch}
      componentReducer={componentReducer}
      setRunEffect={setRunEffect}
    >
      {/* {console.log(componentReducer.val)} */}

      {componentReducer.val === "dashboard" || !componentReducer.val ? (
        <AdminDashboard />
      ) : componentReducer.val === "analysis" ? (
        <Analysis />
      ) : componentReducer.val === "users" ? (
        <AllUsers />
      ) : // ) : componentReducer.val === "flaggedUsers" ? (
      //   <FlaggedUser />
      componentReducer.val === "plansUsers" ? (
        <PlanCreditManagement />
      ) : // ) : componentReducer.val === "websiteControl" ? (
      //   <WebsiteControl />
      // ) : componentReducer.val === "eventCreate" ? (
      //   <EventCreate />
      // ) : componentReducer.val === "paymentCycle" ? (
      //   <PaymentCycle />
      componentReducer.val === "userActivity" ? (
        <UserActivity />
      ) : componentReducer.val === "userApproval" ? (
        <UserApproval />
      ) : componentReducer.val === "blog" ? (
        <Blog />
      ) : // ) : componentReducer.val === "appSetting" ? (
      //   <AppSettings />
      componentReducer.val === "userPermission" ? (
        <UserPermission />
      ) : componentReducer.val === "adminProfile" ? (
        <AdminProfile />
      ) : componentReducer.val === "notifications" ? (
        <Notifications />
      ) : // : componentReducer.val === "prize" ? (
      //    <Prize />
      // ) : componentReducer.val === "reporting" ? (
      //   <Reporting />
      componentReducer.val === "logout" ? (
        <Logout />
      ) : (
        ""
      )}
    </Home>
  );
};

export default AllComponent;
