// import React from "react";
// import Head from "../userApproval/Head";
// import styles from "../AllUsers.module.css";

// const UserActivity = () => {
//   const user = [
//     {
//       id: "1",
//       fullName: "Ashish",
//       plans: "premium",
//       planType: "Weekly",
//       planExpireDate: "4-Sept",
//     },
//     {
//       id: "2",
//       fullName: "Manish",
//       plans: "premium",
//       planType: "Weekly",
//       planExpireDate: "4-Sept",
//     },
//     {
//       id: "3",
//       fullName: "ashish-2",
//       plans: "premium",
//       planType: "Weekly",
//       planExpireDate: "4-Sept",
//     },
//   ];
//   const header = [
//     { title: "Full Name", css: "col-4" },
//     { title: "PLANS", css: "col-1 p-0 d-flex justify-content-evenly" },
//     { title: "PLAN TYPE", css: "col-2 p-0 d-flex justify-content-evenly" },
//     {
//       title: "PLAN EXPIRE DATE",
//       css: "col-2 p-0 d-flex justify-content-evenly",
//     },
//   ];
//   return (
//     <>
//       <div>
//         <h2 className="mt-5 mb-4">UserActivity</h2>
//       </div>
//       <Head header={header} />
//       {/* map use */}
//       {user.map((elem, index) => {
//         const { fullName, plans, planType, planExpireDate } = elem;
//         return (
//           <div
//             className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
//             key={index}
//           >
//             <div
//               className={`col-3 align-self-center p-0 ${styles.paginationAllUsersFont}`}
//             >
//               <div className="align-self-center">{fullName}</div>
//             </div>

//             <div
//               className={`col-1 align-self-center d-flex justify-content-evenly p-0  ${styles.paginationAllUsersFont}`}
//             >
//               <div>{plans}</div>
//             </div>
//             <div
//               className={`col-2 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
//             >
//               <div>{planType}</div>
//             </div>
//             <div
//               className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
//             >
//               <div>{planExpireDate}</div>
//             </div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default UserActivity;
import React, { useEffect, useState } from "react";
import styles from "./UserActivity.module.css";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UserActivityItem from "./UserActivityItem";
const UserActivity = () => {
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
  // console.log(users)
  return (
    <>
      <h3 className="mt-4">User Activities</h3>
      <div
        className={`row p-2 shadow m-0 d-flex justify-content-evenly ${styles.userHead}`}
      >
        <div className={`col-4 p-0 ${styles.allUsersFont}`}>Full Name</div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          User ID
        </div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Plans
        </div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Plan Type
        </div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Plan Expiry Date
        </div>
      </div>

      {users.map((element, index) => {
        return <UserActivityItem user={element} key={index} />;
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

export default UserActivity;
