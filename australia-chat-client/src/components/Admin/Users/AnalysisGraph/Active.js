import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const Active = ({ data }) => {
  const percentage = Math.trunc((data.totalActiveUsers / data.totalUser) * 100);
  // console.log(percentage);
  return (
    <div
      className="d-flex justify-content-center"
      style={{ paddingTop: "1rem" }}
    >
      <CircularProgressbar
        strokeWidth={5}
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          textColor: "#ebb261",
          pathColor: "#ebb261",
          trailColor: "#bfbbbb",
        })}
      />
    </div>
  );
};

export default Active;
