import React, { useState, useEffect } from "react";
import Plan from "./Plan";
import axios from "axios";
// import "../PlansCredits/Plan.css"

const Plans = () => {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const res = await axios.get("api/v1/plans/plans");
    // console.log(res.data.plans);
    setPlans(res.data.plans);
  };

  // const plans = [
  //   {
  //     id: 1,
  //     plan: "p1",
  //     free: true,
  //     premium: false,
  //   },
  //   {
  //     id: 2,
  //     plan: "p2",
  //     free: true,
  //     premium: false,
  //   },
  //   {
  //     id: 3,
  //     plan: "p3",
  //     free: false,
  //     premium: true,
  //   },
  //   {
  //     id: 4,
  //     plan: "p4",
  //     free: false,
  //     premium: true,
  //   },
  //   {
  //     id: 5,
  //     plan: "p5",
  //     free: false,
  //     premium: false,
  //   },
  // ];
  return (
    <>
      <div className="container mt-2">
        <div
          className=" main row pt-2 pb-2 "
          style={{ backgroundColor: "#F3F2F7" }}
        >
          <div className="col-8">Plan Description</div>
          <div className="col-2">Free</div>
          <div className="col-2">Premium</div>
        </div>
        {plans.map((plan, index) => (
          <Plan plan={plan} key={index} />
        ))}
      </div>
    </>
  );
};

export default Plans;
