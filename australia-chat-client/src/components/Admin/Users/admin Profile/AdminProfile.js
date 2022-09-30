import React, { useState } from "react";
import "../admin Profile/AdminProfile.css";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";
import axios from "axios";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const adminData = useSelector((state) => state.admin);

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const passwordConfirmHandler = (event) => {
    setPasswordConfirm(event.target.value);
  };
  const changePasswordHandler = async () => {
    try {
      if (password === passwordConfirm) {
        const res = await axios.post("/api/v1/admin/profile/passwordchange", {
          id: localStorage.getItem("aid"),
          password,
          passwordConfirm,
        });
        setPassword("");
        setPasswordConfirm("");
        setOpenSnackbar(true);
        setMessage(res.data.message);
        setSeverity("success");
      } else {
        setPassword("");
        setPasswordConfirm("");
        setOpenSnackbar(true);
        setMessage("Password Must Be Same");
        setSeverity("error");
      }
    } catch (error) {
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };

  const [data, setData] = useState({
    file: [],
  });
  const handleChange = (e) => {
    setData({
      ...data,
      file: e.target.files[0],
    });
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("avatar", data.file);
    axios
      .post(
        `/api/v1/media/admin-profile/${localStorage.getItem("aid")}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((res) => {
        // console.log(res.data.message);
      });
    // console.log(data);
  };

  // let formData = new FormData();

  // const adminProfileData = async (e) => {
  //   console.log(e.target.files[0]);
  //   if (e.target && e.target.files[0]) {
  //     formData.append("file", e.target.files[0]);
  //   }
  // };
  // const profileImgUpload = async (e) => {
  //   e.preventDefault();
  //   axios
  //     .post(`/api/v1/media/admin-profile/${localStorage.getItem("aid")}`, {
  //       formData,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     });
  // };
  return (
    <>
      <div>
        <SnackbarComponet
          message={message}
          severity={severity}
          open={openSnackbar}
          setOpen={setOpenSnackbar}
        />
        <h3 className="mt-5 ">Admin Profile</h3>
        <h4 className="mt-5 ms-5 ">Update Profile</h4>
        <img
          style={{
            width: "80px",
          }}
          src={
            adminData.photo
              ? `/api/v1/media/admin-profile/${adminData.photo}`
              : `./userImg/Nactor_Bee.svg`
          }
          className="rounded-circle ms-5"
          alt="not found"
        />
        <h5 className="p-0 pt-3  m-0 mt-2 ms-5">Name : {adminData.name}</h5>
        <h5 className="p-0 py-1 m-0 mt-2 ms-5">
          Designation : {adminData.designation}
        </h5>
        <div className="main-input d-flex mt-4 ms-5">
          <div className="form-group w-50 me-5">
            <label htmlFor="pwd">Password:</label>
            <input
              type="Password"
              onChange={passwordHandler}
              value={password}
              className="form-control w-100"
            />
          </div>
          <div className="form-group w-50 me-5">
            <label htmlFor="pwd">Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              onChange={passwordConfirmHandler}
              value={passwordConfirm}
            />
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ">
          <button
            type="button"
            onClick={changePasswordHandler}
            className="btn btn-primary mt-5 "
          >
            Change Password
          </button>
        </div>
        <form>
          <div className="input-group mt-5">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile04"
              aria-describedby="inputGroupFileAddon04"
              aria-label="Upload"
              style={{ height: "40px", width: "500px" }}
              onChange={handleChange}
              name="upload_file"
            />
          </div>
          <div className="d-flex justify-content-center mt-5 ">
            <button
              type="button"
              // onClick={changePasswordHandler}
              onClick={handleSubmit}
              className="btn btn-primary mt-5 "
            >
              Profile Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProfile;
