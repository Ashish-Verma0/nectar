import React, { useState, version } from "react";
import styles from "./AllUsers.module.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalData from "./ModalData";

const UserApproval = () => {
  const user = [
    {
      id: "1",
      gender: "checkbox",
      fullname: "Ashish verma",
      fullBody:
        "https://4.bp.blogspot.com/-DLjAz2-Krqk/U0pEVe2m1tI/AAAAAAAAA7s/ym3CglkFbwQ/s1600/Stunning.jpg",
      selfie:
        "https://4.bp.blogspot.com/-DLjAz2-Krqk/U0pEVe2m1tI/AAAAAAAAA7s/ym3CglkFbwQ/s1600/Stunning.jpg",
      title: "hello",
    },
    {
      id: "2",
      gender: "checkbox",
      fullname: "manish verma",
      fullBody: "",

      selfie: "",
      title: "",
    },
    {
      id: "3",
      gender: "checkbox",
      fullname: "Ashish2 verma",
      fullBody: "",
      selfie: "",
      titlt: "",
    },
  ];
  const [modal, setModal] = useState(false);
  const [tempData, setTempData] = useState([]);
  const handleModal = (fullBody, selfie, title) => {
    let tempData = [fullBody, selfie, title];
    setTempData((item) => [item, ...tempData]);
    console.warn(tempData);
    return setModal(true);
  };
  return (
    <>
      <h3 className="mt-4">User Approval</h3>
      <div
        className={`row p-2 shadow m-0 d-flex justify-content-evenly ${styles.userHead}`}
      >
        <div className={`col-4 p-0 ${styles.allUsersFont}`}>Full Name</div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Full Body
        </div>
        <div
          className={`col-2 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Selfie
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          Video
        </div>
        <div
          className={`col-1 p-0 d-flex justify-content-evenly ${styles.allUsersFont}`}
        >
          View
        </div>
      </div>

      {/* new start */}
      {user.map((elem, index) => {
        const { id, gender, fullname, fullBody, selfie, title } = elem;
        return (
          <div
            className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
            key={index}
          >
            <div
              className={`col-4 align-self-center  p-0 ${styles.paginationAllUsersFont}`}
            >
              <div className="align-self-center">{fullname}</div>
            </div>

            <div
              className={`col-1 align-self-center d-flex justify-content-evenly p-0 ${styles.paginationAllUsersFont}`}
            >
              <input type={gender} value="yes" />
            </div>
            <div
              className={`col-2 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
            >
              <input type={gender} value="yes" />
            </div>
            <div
              className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
            >
              <input type={gender} value="yes" />
            </div>
            <div
              className={`col-1 p-0 align-self-center d-flex justify-content-evenly ${styles.paginationAllUsersFont}`}
              onClick={() => handleModal(fullBody, selfie, title)}
            >
              <VisibilityIcon />
            </div>
          </div>
        );
      })}
      {/* new end */}
      {modal === true ? (
        <ModalData img="https://4.bp.blogspot.com/-DLjAz2-Krqk/U0pEVe2m1tI/AAAAAAAAA7s/ym3CglkFbwQ/s1600/Stunning.jpg" />
      ) : (
        ""
      )}
    </>
  );
};

export default UserApproval;
