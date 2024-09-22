import React from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ labels, data }) => {
  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: 'Profit',
            data: data,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      }}
    />
  );
};

export default Chart;
