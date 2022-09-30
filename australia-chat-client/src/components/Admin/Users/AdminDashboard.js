import React from "react";
import style from "./AdminDashboard.module.css";

import { useState } from "react";
import SalesChart from "./SalesChart";

import { UserData } from "./Data";
const AdminDashboard = () => {
  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.day),
    datasets: [
      {
        label: "Income",
        data: UserData.map((data) => data.userGain),
        backgroundColor: ["rgba(75,192,192,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  return (
    <div>
      <h2 className="my-4 mx-0">Welcome to Nectar !</h2>
      <h5 className="my-3 mx-2 ">Dashboard</h5>
      <div className="row mx-3 ">
        <div className={`col shadow-lg bg-body rounded ${style.daily}`}>
          <div className="row ">
            <h5 className=" col-6 text-start text mb-4">Statistics</h5>
            <h6 className=" col-6 text-end text mb-4">Updated 1 month ago</h6>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="row d-flex">
                <div className="col-md-4 col-sm-2 col-3 ">
                  <img
                    src="/images/finance-logo.svg"
                    // className={`${style.img}`}
                    alt=""
                  />
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <div className="row">
                    <h5 className="col-12">$215</h5>
                    <h6 className="col-12">Daily</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="row">
                <div className="col-md-4 col-sm-2 col-3">
                  <img src="/images/finance-logo.svg" alt="" />
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <div className="row">
                    <h5 className="col-12">$215</h5>
                    <h6 className="col-12">Weekly</h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="row">
                <div className="col-md-4 col-sm-2 col-3">
                  <img src="/images/finance-logo.svg" alt="" />
                </div>
                <div className="col-md-4 col-sm-4 col-4">
                  <div className="row">
                    <h5 className="col-12">$215</h5>
                    <h6 className="col-12">Monthly</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 className="my-3 mx-2 mt-5 ">Daily Sales Overview</h5>
      <div className={` mx-3 my-4 shadow-lg bg-body  ${style.chart}`}>
        <SalesChart chartData={userData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
