import React, { useState } from "react";
import Button from "@mui/material/Button";
// import "../Users/PlansCredits/Plans.css";
// import "./PlansCredits/Plans.css";
import Plans from "./PlansCredits/Plans";
import PremiumPlan from "./PremiumPlans/PremiumPlans";
import SnackbarComponet from "./../ReUsableComponent/SnackbarComponet";

const PlanCreditManagement = () => {
  const [index, setIndex] = React.useState(0);

  const handleClickPlanButton = () => {
    setIndex(0);
  };
  const handleClickPremiumPriceButton = () => {
    setIndex(1);
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");

  return (
    <div className={"bg-body"}>
      <SnackbarComponet
        message={message}
        severity={severity}
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      {/* <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      ></Box> */}

      <div className="mt-4 ms-4 p-4" sx={{ width: "100%" }}>
        <div mx={4} sx={{ borderBm: 1, borderColor: "divider" }}>
          {/* <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#59d6d6",
                color: "#59d6d6",
              },
            }}
          > */}

          <Button
            className={"mr-5 my-2"}
            variant={index === 0 ? "contained" : "outlined"}
            style={
              index === 0
                ? { backgroundColor: "#7367F0" }
                : { color: "#7367F0" }
            }
            onClick={handleClickPlanButton}
            // {...a11yProps(0)}
          >
            Plan
          </Button>

          <Button
            className={"ms-5 "}
            variant={index === 1 ? "contained" : "outlined"}
            style={
              index === 1
                ? { backgroundColor: "#7367F0" }
                : { color: "#7367F0" }
            }
            onClick={handleClickPremiumPriceButton}
            // {...a11yProps(1)}
          >
            Premium Price
          </Button>

          {/* </Tabs> */}
        </div>
        <div>
          {index === 0 ? (
            <Plans />
          ) : (
            <PremiumPlan
              setMessage={setMessage}
              setOpenSnackbar={setOpenSnackbar}
              setSeverity={setSeverity}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanCreditManagement;
