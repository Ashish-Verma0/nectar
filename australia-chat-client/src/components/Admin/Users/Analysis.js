import React, { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import styles from "./Analysis.module.css";
import Active from "./AnalysisGraph/Active";
import Verified from "./AnalysisGraph/Verified";
import Flagged from "./AnalysisGraph/Flagged";
import Blocked from "./AnalysisGraph/Blocked";
import axios from "axios";

// /api/v1/admin/user/getUserStatus

const Analysis = () => {
  const [data, setData] = useState({});
  const getData = async () => {
    try {
      const res = await axios.get(`/api/v1/admin/user/getUserStatus`);
      setData(res.data);
      // console.log(data);
      // setTotalUser(res.data.totalBlog);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="row mb-3">
        <h1 className="mt-4">Analysis</h1>
      </div>
      <div className="row">
        <div className={`col-sm-6 col-md-3 `}>
          <div className={styles.analysisGraph1}>
            <Active data={data} />
            <p className="d-flex justify-content-center py-3">
              Total Active Users
            </p>
          </div>
        </div>
        <div className={`col-sm-6 col-md-3 `}>
          <div className={styles.analysisGraph2}>
            <Verified data={data} />
            <p className="d-flex justify-content-center py-3">
              Total Verified Users
            </p>
          </div>
        </div>
        <div className={`col-sm-6 col-md-3`}>
          <div className={styles.analysisGraph3}>
            <Flagged data={data} />
            <p className="d-flex justify-content-center py-3">
              Total Unverified Users
            </p>
          </div>
        </div>
        <div className={`col-sm-6 col-md-3`}>
          <div className={styles.analysisGraph4}>
            <Blocked data={data} />
            <p className="d-flex justify-content-center py-3">
              Total Blocked Users
            </p>
          </div>
        </div>
      </div>
      <AllUsers />
    </>
  );
};

export default Analysis;
