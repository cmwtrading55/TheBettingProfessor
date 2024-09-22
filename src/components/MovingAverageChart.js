import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function MovingAverageChart({ data }) {
  // Function to safely parse float values after removing commas
  const parseNumber = (value) => {
    if (value === undefined || value === null || value === '') {
      return null; // Return null if value is invalid or empty
    }
    return parseFloat(value.toString().replace(/,/g, ''));
  };

  // Extract data directly from column AN (index 39) and filter out blanks
  const movingAverageData = useMemo(() => {
    return data
      .slice(1) // Skip header row
      .map((row) => parseNumber(row[39])) // Column AN: Moving Average
      .filter((value) => value !== null); // Remove null values (blanks)
  }, [data]);

  // Prepare data for chart, starting from Bet Number 100
  const filteredData = movingAverageData.slice(99); // Remove first 99 values

  const chartData = {
    labels: Array.from({ length: filteredData.length }, (_, i) => i + 100), // X-axis labels start at 100
    datasets: [
      {
        label: 'Moving Average (Last 100 Bets)',
        data: filteredData,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        pointRadius: 0, // Remove data points on the line
      },
    ],
  };

  // Chart options with custom tooltip and bolder y=0 gridline
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Bet Number',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          borderDash: [8, 4],
          color: '#ddd',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Moving Average Profit/Loss',
          font: {
            size: 16,
            weight: 'bold',
          },
        },
        grid: {
          color: (context) => (context.tick.value === 0 ? '#000' : '#ccc'),
          lineWidth: (context) => (context.tick.value === 0 ? 2 : 1),
          borderDash: [8, 4],
        },
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.7)',
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
      },
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return (
    <div className="graph-container">
      <h2 style={{ textAlign: 'center', color: '#333' }}>Last 100 Bets Moving Average</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default MovingAverageChart;
