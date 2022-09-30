import React from "react";
import { Line } from "react-chartjs-2";
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";

function SalesChart({ chartData }) {
  return <Line data={chartData} />;
}

export default SalesChart;
