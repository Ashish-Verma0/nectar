import React, { useState, useRef, useReducer } from "react";
import styles from "./login.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AuthAdminActions } from "../../redux/admin-dash";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";
import SnackbarComponet from "../ReUsableComponent/SnackbarComponet";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const initialState = {
  value: "",
  email: false,
  password: false,
  form: true,
};

const reducerFunction = (state, action) => {
  if (action.type === "FORM_OPEN") {
    return {
      value: action.value,
      form: state.form ? state.form : true,
      email: false,
      password: false,
    };
  } else if (action.type === "EMAIL_OPEN") {
    return {
      value: action.value,
      email: true,
      form: false,
      password: false,
    };
  } else if (action.type === "PASSWORD_OPEN") {
    return {
      value: action.value,
      password: true,
      email: false,
      form: false,
    };
  }
};
function LoginRight({ setRunEffect }) {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const resetPasswordRef = useRef();
  const resetPasswordConfirmRef = useRef();
  const otpRef = useRef();

  const [openInputState, dispatch] = useReducer(reducerFunction, initialState);
  const storDispatch = useDispatch();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [resetPasswordVisibility, setResetPasswordVisibility] = useState(false);
  const [resetPasswordConfirmVisibility, setResetPasswordConfirmVisibility] =
    useState(false);

  const handleClickVisibilityOn = () => {
    setPasswordVisibility(false);
  };
  const handleClickVisibilityOff = () => {
    setPasswordVisibility(true);
  };
  const handleResetPasswordVisibilityOn = () => {
    setResetPasswordVisibility(false);
  };
  const handleResetPasswordVisibilityOff = () => {
    setResetPasswordVisibility(true);
  };

  const handleResetPasswordConfirmVisibilityOn = () => {
    setResetPasswordConfirmVisibility(false);
  };
  const handleResetPasswordConfirmVisibilityOff = () => {
    setResetPasswordConfirmVisibility(true);
  };
  const formInputHandler = () => {
    dispatch({ type: "FORM_OPEN", value: "" });
  };

  const emailInputHandler = () => {
    dispatch({ type: "EMAIL_OPEN", value: "emailOpne" });
  };

  const passwordInputHandler = (email) => {
    dispatch({ type: "PASSWORD_OPEN", value: email });
  };

  const forgetPasswordHandler = () => {
    emailInputHandler();
  };

  const handleArrowBackClick = () => {
    if (openInputState.value === "emailOpne") formInputHandler();
    else emailInputHandler();
  };

  const loginEmilHandler = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("/api/v1/admin/forget", {
        email: emailRef.current.value,
      });
      passwordInputHandler(emailRef.current.value);
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };
  const loginPasswordHandler = async (e) => {
    try {
      e.preventDefault();
      if (resetPasswordRef.current.value.length < 8) {
        setOpenSnackbar(true);
        setSeverity("error");
        setMessage("Password should be of minimum 8 characters");
      } else {
        // console.log(openInputState.value);

        const res = await axios.patch("/api/v1/admin/forget", {
          email: openInputState.value,
          otp: otpRef.current.value,
          password: resetPasswordRef.current.value,
          passwordConfirm: resetPasswordConfirmRef.current.value,
        });
        console.log("firs");
        setOpenSnackbar(true);
        setMessage(res.data.message);

        // console.log(
        //   openInputState.value,
        //   resetPasswordRef.current.value,
        //   resetPasswordConfirmRef.current.value
        // );
        // console.log(res.data);
        console.log(res.data);
        if (res.data.status === "success") {
          setSeverity("success");
        } else {
          setSeverity("error");
        }
        formInputHandler();
      }
    } catch (error) {
      setOpenSnackbar(true);
      setSeverity("error");
      setMessage(error.response.data.message);
      // console.log(error);
    }
  };
  const loginHandler = async (e) => {
    try {
      e.preventDefault();
      // eslint-disable-next-line no-unused-vars
      const res = await axios
        .post("/api/v1/admin", {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
        .then((res) => {
          localStorage.setItem("aid", res.data.data.user._id);
          storDispatch(
            AuthAdminActions.adminDashboard({
              name: res.data.data.user.name,
              photo: res.data.data.user.photo,
              email: res.data.data.user.email,
              designation: res.data.data.user.designation,
              dashboard: res.data.data.user.permissions.dashboard,
              analysis: res.data.data.user.permissions.analysis,
              users: res.data.data.user.permissions.users,
              plans: res.data.data.user.permissions.plans,
              notifications: res.data.data.user.permissions.notifications,
              userActivity: res.data.data.user.permissions.userActivity,
              userApproval: res.data.data.user.permissions.userApproval,
              userPermission: res.data.data.user.permissions.userPermission,
              blog: res.data.data.user.permissions.blog,
              adminProfile: res.data.data.user.permissions.adminProfile,
            })
          );
          setRunEffect(true);
        })
        .catch((e) => {
          // alert(e.response.data.message);
          setOpenSnackbar(true);
          setMessage(e.response.data.message);
          setSeverity("error");
        });
      // console.log(res);
    } catch (e) {
      // console.log(e.response);
    }
    // axios
    //   .post("/api/v1/admin", {
    //     email: emailRef.current.value,
    //     password: passwordRef.current.value,
    //   })
    //   .then((res) => {
    //     localStorage.setItem("aid", res.data.data.user._id);
    //     storDispatch(
    //       AuthAdminActions.adminDashboard({
    //         name: res.data.data.user.name,
    //         photo: res.data.data.user.photo,
    //         email: res.data.data.user.email,
    //       })
    //     );
    //     setRunEffect(true);
    //     // navigate("/admin");
    //   })
    //   .catch((e) => {
    //     console.log();
    //   });
  };

  return (
    <>
      <div
        className={styles.loginRight}
        style={{
          color: "#000",
          backgroundColor: "rgba(255, 90, 150, .15)",
          backdropFilter: "blur(5px)",
          position: " relative",
          // margin: "15px",
        }}
      >
        {/* <SnackbarLogin
          open={openSnackbar}
          setOpen={setOpenSnackbar}
          message={errorMessage}
        /> */}
        <SnackbarComponet
          message={message}
          severity={severity}
          open={openSnackbar}
          setOpen={setOpenSnackbar}
        />
        <div
          style={{
            width: "8rem",
            height: "8rem",
            // backgroundColor: "white",
            // borderRadius: "50%",
          }}
        >
          <img
            src="/images/loginlogo.png"
            className="img-fluid"
            alt=""
            style={{}}
          />
        </div>

        <h4 className="p-3">Login To The Admin Panel</h4>
        {openInputState.form && (
          <form onSubmit={loginHandler} className={styles.loginform}>
            <div className={styles.inputWithIcon}>
              <input
                type="text"
                placeholder="Email"
                name="email"
                ref={emailRef}
              />
              <img src="/images/nameIcon.png" alt="not found" />
            </div>

            <div className={`${styles.inputWithIcon} mt-4`}>
              <input
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                name="password"
                ref={passwordRef}
              />
              <img src="/images/lock.png" alt="not found" />
              {passwordVisibility ? (
                <VisibilityIcon
                  fontSize="large"
                  className={styles.eyeIcon}
                  onClick={handleClickVisibilityOn}
                />
              ) : (
                <VisibilityOffIcon
                  fontSize="large"
                  className={styles.eyeIcon}
                  onClick={handleClickVisibilityOff}
                />
              )}
            </div>
            <p
              onClick={forgetPasswordHandler}
              className={`d-flex justify-content-end mt-4 ${styles.forgetPasswordLink}`}
            >
              Forgot password
            </p>
            <div className="mt-4 mb-lg-4">
              <button className={`btn btn-md ${styles.notificationButton}`}>
                Login
              </button>
            </div>
          </form>
        )}
        {openInputState.email && (
          <>
            {!(openInputState.value === "") && (
              <div
                style={{
                  color: "black",
                  // backgroundColor: "teal",
                  position: "absolute",
                  top: "5px",
                  left: "10px",
                }}
              >
                <ArrowBackIcon onClick={handleArrowBackClick} />
              </div>
            )}

            <form onSubmit={loginEmilHandler} className={styles.loginform}>
              <div className={`${styles.inputWithIcon} mb-4`}>
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  ref={emailRef}
                />
                <img src="/images/nameIcon.png" alt="not found" />
              </div>
              <div className="mt-2 mb-2">
                <button
                  onClick={forgetPasswordHandler}
                  className={`btn btn-md ${styles.notificationButton}`}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </>
        )}
        {openInputState.password && (
          <>
            {!(openInputState.value === "emailOpne") && (
              <div
                style={{
                  color: "black",
                  // backgroundColor: "teal",
                  position: "absolute",
                  top: "5px",
                  left: "10px",
                }}
              >
                <ArrowBackIcon onClick={handleArrowBackClick} />
              </div>
            )}
            <form onSubmit={loginPasswordHandler} className={styles.loginform}>
              <div className={`${styles.inputWithIcon} mb-4`}>
                <input
                  type="number"
                  placeholder="Enter OTP"
                  name="otp"
                  ref={otpRef}
                />
                {/* <img src="/images/lock.png" alt="not gound" /> */}
                {/* {resetPasswordVisibility ? (
                  <VisibilityIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordVisibilityOn}
                  />
                ) : (
                  <VisibilityOffIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordVisibilityOff}
                  />
                )} */}
                {/* {showOtpMessage.visibility &&( <p style={{color:"red"}}>{showOtpMessage.message}</p>)} */}
              </div>
              <div className={`${styles.inputWithIcon} mb-4`}>
                <input
                  type={resetPasswordVisibility ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  ref={resetPasswordRef}
                />
                <img src="/images/lock.png" alt="not found" />
                {resetPasswordVisibility ? (
                  <VisibilityIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordVisibilityOn}
                  />
                ) : (
                  <VisibilityOffIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordVisibilityOff}
                  />
                )}
              </div>
              <div className={`${styles.inputWithIcon} mb-4`}>
                <input
                  type={resetPasswordConfirmVisibility ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="password"
                  ref={resetPasswordConfirmRef}
                />
                <img src="/images/lock.png" alt="not found" />
                {resetPasswordConfirmVisibility ? (
                  <VisibilityIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordConfirmVisibilityOn}
                  />
                ) : (
                  <VisibilityOffIcon
                    fontSize="large"
                    className={styles.eyeIcon}
                    onClick={handleResetPasswordConfirmVisibilityOff}
                  />
                )}
              </div>

              <div className="mt-4 mb-lg-4">
                <button
                  type="submit"
                  className={`btn btn-md ${styles.notificationButton}`}
                >
                  Save
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default LoginRight;
