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

import { Line } from "react-chartjs-2";

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

const SurvivalDistribution = (props) => {
  const { survivalDistributionData } = props;

  const data = {
    labels: [
      0, 2000, 4000, 6000, 8000, 10000, 12000, 14000, 16000, 18000, 20000,
    ],
    datasets: [
      {
        data: survivalDistributionData,
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
        text: "Survival Distribution Plot",
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
          text: "Survival Distribution Function",
        },
      },
      x: {
        title: {
          display: true,
          text: "Days elapsed",
        },
      },
    },
  };

  return (
    <>
      <Line data={data} height={50} width={50} options={options} />
    </>
  );
};

export default SurvivalDistribution;
