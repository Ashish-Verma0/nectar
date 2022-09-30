import React from "react";
// import NewsLetter from "./RightSide/NewsLetter";
// import WebEmail from "./RightSide/WebEmail";
// import AddCart from "./RightSide/AddCart";
import Notification from "./RightSide/Notification";
import { useSelector } from "react-redux";

const RightSide = ({ componentReducer }) => {
  const adminData = useSelector((state) => state.admin);

  return (
    <div  style={{ marginTop: "35px",width:"100%" }}>
      <div
        className="shadow-lg bg-body rounded"
        style={{
          backgroundColor: "#ffffff",
          padding: "20%",
          margin: "5%, 20% !important",
        }}
      >
        <div className="row p-lg-0 m-lg-0">
          <div className="col d-flex justify-content-center">
            <div
              className="shadow-lg bg-body"
              style={{
                height: "75px",
                width: "75px",
                borderRadius: "50%",
                position: "relative",
              }}
            >
              {/* {console.log(adminData.photo)} */}
              <img
                src={
                  adminData.photo
                    ? `/api/v1/media/admin-profile/${adminData.photo}`
                    : `./userImg/Nactor_Bee.svg`
                }
                style={{
                  width: "67px",
                  position: "absolute",
                  left: "4px",
                  top: "4px",
                }}
                className="rounded-circle "
                alt="not found"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col justify-content-center text-center ">
            <h5 className="p-0 pt-3  m-0">{adminData.name}</h5>

            <p className="p-0 py-1 m-0">{adminData.designation}</p>
            <div
              style={{
                // marginLeft: "15%",
                // width: "70%",
                alignItems: "center",
                backgroundColor: "#EBE9F1",
                height: "1px",
                marginTop: "25px",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* <Notification /> */}
    </div>
  );
};

export default RightSide;
