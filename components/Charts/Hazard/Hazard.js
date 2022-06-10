import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Scatter } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const Hazard = (props) => {
  const { hazardData } = props;

  const data = {
    labels: [0, 2500, 5000, 7500, 10000, 12500, 15000, 17500],
    datasets: [
      {
        showLine: true,
        data: hazardData,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Hazard Plot",
      },
    },
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(100,97,100,1)",
        fill: "start",
        backgroundColor: "rgba(255, 99, 132, 0)",
      },
      point: {
        radius: 0,
        hitRadius: 0,
      },
      title: {
        display: true,
        text: "Hazard Plot",
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Hazard Function",
        },
        beginAtZero: true,
      },
      x: {
        title: {
          display: true,
          text: "Days elapsed",
        },
        beginAtZero: true,
        min: 0,
        ticks: {
          stepSize: 2500,
        },
        max: 17500,
      },
    },
  };

  return (
    <>
      <Scatter data={data} height={50} width={50} options={options} />
    </>
  );
};

export default Hazard;
