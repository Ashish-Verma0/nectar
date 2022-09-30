import React from "react";

export const SearchList = (props) => {
  const user = props.user;
  // console.log(props);
  return (
    <div
      className="row my-1 p-2 m-0 d-flex shadow bg-body justify-content-evenly  "
      // key={user._id}
      key={user._id}
    >
      <div className={`col-4 align-self-center  p-0`}>
        <img
          src={
            props.user.profilePhoto
              ? `/api/v1/user-media/user-profile/${props.user.profilePhoto}`
              : ""
          }
          className={`pe-2 }`}
          width="50px"
          style={{ borderRadius: "50%" }}
          alt="not found"
        />
        <div className="align-self-center">{user.name}</div>
      </div>
      {/* <div className={`col-3 m-0 p-0`}>
      </div> */}
      <div
        className={`col-1 align-self-center d-flex justify-content-evenly p-0 `}
      >
        {user.iIdentifyAs}
      </div>
      <div
        className={`col-2 p-0 align-self-center d-flex justify-content-evenly `}
      >
        {user.phone}
      </div>
      <div
        className={`col-1 p-0 align-self-center d-flex justify-content-evenly`}
      >
        {user.userId}
      </div>
      <div
        className={`col-1 p-0 align-self-center  d-flex justify-content-evenly`}
        style={
          user.userVerifyed
            ? {
                color: "#28c76f",
                backgroundColor: "#e5f8ee",
                borderRadius: "10px",
              }
            : {
                color: "#ff5858",
                backgroundColor: "#ffd4d4",
                borderRadius: "10px",
              }
        }
      >
        {user.userVerifyed ? "Active" : "InActive"}
      </div>
      {/* <div
          className={`col-1 p-0 align-self-center d-flex justify-content-evenly`}
        >
          <i>
            <VisibilityIcon />
          </i>
        </div> */}
    </div>
  );
};

export default SearchList;
