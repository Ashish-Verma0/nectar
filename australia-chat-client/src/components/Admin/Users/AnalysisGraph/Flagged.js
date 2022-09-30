import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Flagged = (data) => {
  const percentage = Math.trunc(
    (data.data.totalUnverifiedUser / data.data.totalUser) * 100
  );
  // console.log(data.data.totalUnverifiedUser);
  // const percentage = 66;
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
          textColor: "#39c7e1",
          pathColor: "#39c7e1",
          trailColor: "#bfbbbb",
        })}
      />
    </div>
  );
};

export default Flagged;
