import React, { useState } from "react";
import axios from "axios";
import Switch from "@mui/material/Switch";
import SnackbarComponet from "./../../ReUsableComponent/SnackbarComponet";

import "../PlansCredits/Plans.css";
const Plan = ({ plan, index }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [premium, setPremium] = useState(plan.premium);
  const handleChangePremium = async (e) => {
    try {
      setPremium(e.target.checked);
      // console.log(e.target.checked, plan._id);
      const res = await axios.patch("/api/v1/plans/changedPlan/premium", {
        id: plan._id,
        premium: e.target.checked,
      });
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
      // console.log(res);
    } catch (error) {
      // console.log(error);
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };
  const [free, setFree] = useState(plan.free);
  const handleChangeFree = async (e) => {
    try {
      setFree(e.target.checked);
      // console.log(e.target.checked, plan._id);
      const res = await axios.patch("/api/v1/plans/changedPlan/free", {
        id: plan._id,
        free: e.target.checked,
      });
      setOpenSnackbar(true);
      setMessage(res.data.message);
      setSeverity("success");
      // console.log(res);
    } catch (error) {
      // console.log(error);
      setOpenSnackbar(true);
      setMessage(error.response.data.message);
      setSeverity("error");
    }
  };
  return (
    <div
      className="main row justify-content-l"
      style={
        index % 2 === 0
          ? { backgroundColor: "#FAFAFC" }
          : { backgroundColor: "#FFFFFF" }
      }
    >
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <div className="col-8">{plan.planName}</div>
      <div className="col-2">
        <Switch onChange={handleChangeFree} checked={free} />
      </div>
      <div className="col-2">
        <Switch onChange={handleChangePremium} checked={premium} />
      </div>
    </div>
  );
};

export default Plan;
