import React, { useEffect, useState } from "react";
// import PremiumPlan from "./PremiumPlan";
import axios from "axios";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const PremiumPlans = (props) => {
  const [data, setData] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("api/v1/plans/premium/price");
    // console.log(res.data.premiumPrice);
    setData(res.data.premiumPrice);
  };

  const weeklyHandleClickLeft = async () => {
    try {
      if (data.weekly >= 2) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          weekly: data.weekly - 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      } else {
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };
  const weeklyHandleClickRight = async () => {
    try {
      if (data.weekly >= 1) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          weekly: data.weekly + 1,
        });
        getData();
        // console.log(res.data.message);
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };

  const monthlyHandleClickLeft = async () => {
    try {
      if (data.monthly >= 2) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          monthly: data.monthly - 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };
  const monthlyHandleClickRight = async () => {
    try {
      if (data.monthly >= 1) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          monthly: data.monthly + 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };

  const quaterlyHandleClickLeft = async () => {
    try {
      if (data.quaterly >= 2) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          quaterly: data.quaterly - 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };
  const quaterlyHandleClickRight = async () => {
    try {
      if (data.quaterly >= 1) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          quaterly: data.quaterly + 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };

  const yearlyHandleClickLeft = async () => {
    try {
      if (data.yearly >= 2) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          yearly: data.yearly - 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };
  const yearlyHandleClickRight = async () => {
    try {
      if (data.yearly >= 1) {
        const res = await axios.patch("api/v1/plans/premium/price", {
          yearly: data.yearly + 1,
        });
        getData();
        props.setMessage(res.data.message);
        props.setOpenSnackbar(true);
        props.setSeverity("success");
      }
    } catch (error) {
      props.setMessage(error.response.data.message);
      props.setOpenSnackbar(true);
      props.setSeverity("error");
    }
  };
  return (
    <>
      <div className="container mt-2">
        <div className="row pt-2 pb-2" style={{ backgroundColor: "#F3F2F7" }}>
          <div className="col-8">Plan the time period</div>
          <div className="col-4 ps-4">Price</div>
        </div>
        <div className="row" style={{ backgroundColor: "#FAFAFC" }}>
          <div className="col-8">Weekly</div>
          <div className="col-4">
            <div className="row h-50">
              <div
                className="col-1 mt-2 px-3 mb-2"
                onClick={weeklyHandleClickLeft}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div className="col-1 mt-2 mb-2">{data.weekly}$</div>
              <div
                className="col-1 mt-2 px-3 mb-2"
                onClick={weeklyHandleClickRight}
              >
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#FAFAFC" }}>
          <div className="col-8">Monthly</div>
          <div className="col-4">
            <div className="row h-50">
              <div
                className="col-1 mt-2 px-3 mb-2"
                onClick={monthlyHandleClickLeft}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div className="col-1 mt-2 mb-2">{data.monthly}$</div>
              <div
                className="col-1 px-3 mt-2 mb-2"
                onClick={monthlyHandleClickRight}
              >
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#FAFAFC" }}>
          <div className="col-8">Quarterly</div>
          <div className="col-4">
            <div className="row h-50">
              <div
                className="col-1 px-3 mt-2 mb-2"
                onClick={quaterlyHandleClickLeft}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div className="col-1 mt-2 mb-2">{data.quaterly}$</div>
              <div
                className="col-1 px-3 mt-2 mb-2"
                onClick={quaterlyHandleClickRight}
              >
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="row" style={{ backgroundColor: "#FAFAFC" }}>
          <div className="col-8">Yearly</div>
          <div className="col-4">
            <div className="row h-50">
              <div
                className="col-1 mt-2 px-3 mb-2"
                onClick={yearlyHandleClickLeft}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div className="col-1 mt-2 mb-2">{data.yearly}$</div>
              <div
                className="col-1 mt-2 px-3 mb-2"
                onClick={yearlyHandleClickRight}
              >
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumPlans;
