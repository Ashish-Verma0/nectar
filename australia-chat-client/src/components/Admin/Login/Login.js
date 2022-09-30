import React from "react";
import styles from "./login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginLeft from "./LoginLeft";
import LoginRight from "./LoginRight";

function Login({ setRunEffect }) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#E8E8E8",
      }}
    >
      <div
        className={`row ${styles.login}`}
        style={{
          backgroundImage: `url("/images/loginImage.jpg")`,
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-lg-7 d-none d-lg-flex p-0 m-0 ">
          <LoginLeft />
        </div>
        <div className="col-lg-5 p-0 m-0">
          <LoginRight setRunEffect={setRunEffect} />
        </div>
      </div>
    </div>
  );
}

export default Login;
