import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Blocked = ({ data }) => {
  // const percentage = 66;
  const percentage = Math.trunc(
    (data.totalBlockedUsers / data.totalUser) * 100
  );
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
          textColor: "#35b446",
          pathColor: "#35b446",
          trailColor: "#bfbbbb",
        })}
      />
    </div>
  );
};

export default Blocked;
