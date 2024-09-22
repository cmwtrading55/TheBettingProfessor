import React, { useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function ProfitLossGraph({ data }) {
  // Function to safely parse float values after removing commas
  const parseNumber = (value) => parseFloat(value.toString().replace(/,/g, ''));

  // State to keep track of the selected sport filter
  const [selectedSport, setSelectedSport] = useState('All');

  // Extract unique sports for the dropdown filter, ignoring the header row
  const sportsOptions = useMemo(() => {
    const sports = data.slice(1).map((row) => row[3]); // Skip the header row and get sports data
    return ['All', ...new Set(sports)];
  }, [data]);

  // Filter and process data based on selected sport
  const filteredData = useMemo(() => {
    let filtered = data.slice(1); // Start from the second row to skip headers

    if (selectedSport !== 'All') {
      filtered = filtered.filter((row) => row[3] === selectedSport); // Filter by sport
    }

    // Calculate cumulative stake and P/L
    let cumulativePL = 0;
    let cumulativeStake = 0;
    return filtered.map((row) => {
      cumulativePL += parseNumber(row[10]); // Assuming column K (index 10) is the P/L
      cumulativeStake += parseNumber(row[2]); // Assuming column C (index 2) is the Stake
      return {
        pl: cumulativePL,
        stake: cumulativeStake,
        matchDetail: row[4], // Column F for match details
      };
    });
  }, [data, selectedSport]);

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
        min: 0,
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
            return [`${item.matchDetail}`, `Cumulative P/L: ${item.pl.toFixed(2)}`];
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
      <h2 style={{ textAlign: 'center', color: '#333' }}>Profit & Loss vs Cumulative Stake</h2>
      {/* Sport Filter Dropdown */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>
          Filter by Sport:{' '}
          <select value={selectedSport} onChange={(e) => setSelectedSport(e.target.value)}>
            {sportsOptions.map((sport, index) => (
              <option key={index} value={sport}>
                {sport}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default ProfitLossGraph;
