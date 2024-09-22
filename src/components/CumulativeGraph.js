import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function CumulativeGraph({ data }) {
  // Function to safely parse float values after removing commas
  const parseNumber = (value) => parseFloat(value.toString().replace(/,/g, ''));

  // Extract relevant data from the columns
  const cumulativePLData = data.map((row) => parseNumber(row[11])); // Column L: Cumulative P/L
  const cumulativeStakeData = data.map((row) => parseNumber(row[12])); // Column M: Cumulative Stake
  const betDetails = data.map((row) => row[5]); // Column F: Bet details

  // Filter out invalid data points
  const filteredData = cumulativePLData
    .map((value, index) => ({
      pl: value,
      stake: cumulativeStakeData[index],
      betDetail: betDetails[index],
    }))
    .filter((item) => !isNaN(item.pl) && !isNaN(item.stake) && item.stake >= 0);

  // Find maximum cumulative stake value
  const maxStake = Math.max(...filteredData.map((item) => item.stake));

  // Prepare data for chart
  const chartData = {
    labels: filteredData.map((item) => item.stake), // X-axis labels as cumulative stake values
    datasets: [
      {
        label: 'Cumulative P/L',
        data: filteredData.map((item) => item.pl),
        fill: {
          target: 'origin',
          above: 'rgba(75, 192, 192, 0.3)', // Gradient fill color above the line
          below: 'rgba(255, 99, 132, 0.3)', // Gradient fill color below the line
        },
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.8)',
        borderWidth: 3, // Make line thicker
        pointRadius: 4, // Size of points on the line
        pointBackgroundColor: 'rgb(75, 192, 192)', // Point color
      },
    ],
  };

  // Chart options with custom tooltip and bolder y=0 gridline
  const options = {
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: 'Cumulative Stake',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        min: 0, // Set the minimum x-axis value to 0
        max: maxStake, // Dynamically set maximum x-axis value based on data
        grid: {
          borderDash: [8, 4], // Dashed grid lines
          color: '#ddd',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Cumulative P/L',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: (context) => (context.tick.value === 0 ? '#000' : '#ccc'), // Bolder line at y=0
          lineWidth: (context) => (context.tick.value === 0 ? 2 : 1), // Thicker line at y=0
          borderDash: [8, 4], // Dashed grid lines
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)', // Dark tooltip background
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 12,
        },
        boxPadding: 10,
        cornerRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        callbacks: {
          // Custom tooltip content
          label: (tooltipItem) => {
            const item = filteredData[tooltipItem.dataIndex];
            return [`${item.betDetail}`, `Cumulative P/L: ${item.pl.toFixed(2)}`];
          },
        },
      },
      legend: {
        position: 'bottom',
        labels: {
          font: {
            size: 14,
          },
          padding: 20,
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Cumulative P/L vs Cumulative Stake</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CumulativeGraph;
