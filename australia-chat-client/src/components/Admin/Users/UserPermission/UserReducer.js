import React, { useReducer } from "react";

const UserReducer = () => {
  const [permissionState, dispatch] = useReducer(reducerFunction, {
    state: [
      {
        name: "Ankush",
        email: "ankush@gmail.com",
        permission: ["User Approval", "Approve", "Edit page"],
      },
    ],
  });

  console.log("THis is add dispatch", permissionState);
  return <div>UserReducer</div>;
};

export default UserReducer;
