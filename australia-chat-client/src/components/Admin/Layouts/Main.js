import React from "react";
import Search from "./Search";
const Main = ({ children }) => {
  return (
    <div style={{ marginTop: "35px" }} className="mx-3">
      <Search />
      <div>{children}</div>
    </div>
  );
};

export default Main;
