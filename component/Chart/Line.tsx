import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
        display: false,
      },
    title: {
      display: true,
      text: 'Sales Overview',
    },
  },
};

const labels = [2006,2007,2008,2009,2010,2011,2012];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Sales',
      data: [50,75,50,75,50,100],     
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(69, 58, 148)',
      lineTension: 0.3,
    },
    {
      label: 'Total Revenue',
      data: [90,65,40,65,40,65,50],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgb(69, 58, 148)',
      tension:0.3,
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}
