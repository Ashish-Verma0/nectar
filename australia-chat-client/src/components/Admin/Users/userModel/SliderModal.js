import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

export default function SliderModal(props) {
  return (
    <div className="row p-3">
      <div className="col-3">
        <p>{props.firstName}</p>
      </div>
      <div className="col-5">
        <Box sx={{ width: "auto", color: "#1ECEA5" }}>
          <Slider
            aria-label="Always visible"
            defaultValue={props.value}
            step={props.step}
            valueLabelDisplay="on"
            disabled
          />
        </Box>
      </div>
      <div className="col-4">
        <p>{props.secondName}</p>
      </div>
    </div>
  );
}
