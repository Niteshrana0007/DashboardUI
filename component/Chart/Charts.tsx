import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Total Revenue',
    },
  },
};

const labels = [2006,2007,2008,2009,2010,2011,2012];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total Income',
      data: [100,75,50,75,50,75,100],
      backgroundColor: 'rgb(244, 59, 72)',
    },
    {
      label: 'Total Outcome',
      data: [90,65,40,65,40,65,90],
      backgroundColor: 'rgb(69, 58, 148)',
    },
  ],
};

export function DemoColumn() {
  return <Bar options={options} data={data} />;
}

export default DemoColumn; 