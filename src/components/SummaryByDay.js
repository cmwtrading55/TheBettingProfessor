import React, { useState, useEffect } from 'react';

function SummaryByDay({ data, onFilterChange }) {
  const [selectedDate, setSelectedDate] = useState(null); // Track the selected date

  const filteredData = data.slice(1); // Remove header row by slicing data from index 1

  let validBetCount = 0;
  let invalidBetCount = 0;
  const skippedRows = [];

  const summary = filteredData.reduce((acc, bet, index) => {
    const date = bet[0]; // Assuming date is in column 0
    const stake = parseFloat(bet[2]); // Column C: Stake
    const profitLoss = parseFloat(bet[10]); // Column K: Profit/Loss
    const unitProfitLoss = parseFloat(bet[9]); // Column J: Unit P/L

    if (isNaN(stake) || isNaN(profitLoss) || isNaN(unitProfitLoss)) {
      invalidBetCount += 1;
      skippedRows.push({ index: index + 2, bet });
      return acc;
    }

    validBetCount += 1;

    if (!acc[date]) {
      acc[date] = {
        date,
        stake: 0,
        profitLoss: 0,
        unitProfitLoss: 0,
        numBets: 0,
      };
    }

    acc[date].stake += stake;
    acc[date].profitLoss += profitLoss;
    acc[date].unitProfitLoss += unitProfitLoss;
    acc[date].numBets += 1;

    return acc;
  }, {});

  const summaryArray = Object.values(summary);

  // Calculate totals
  const totalStake = summaryArray.reduce((acc, row) => acc + row.stake, 0);
  const totalProfitLoss = summaryArray.reduce((acc, row) => acc + row.profitLoss, 0);
  const totalUnitProfitLoss = summaryArray.reduce((acc, row) => acc + row.unitProfitLoss, 0);
  const totalBets = summaryArray.reduce((acc, row) => acc + row.numBets, 0);

  useEffect(() => {
    console.log('Valid Bets Processed:', validBetCount);
    console.log('Invalid Bets Skipped:', invalidBetCount);
    console.log('Skipped Rows:', skippedRows);
    console.log('Calculated Summary by Day:', summary);
    console.log('Total Stake:', totalStake);
    console.log('Total Profit/Loss:', totalProfitLoss);
    console.log('Total Unit P/L:', totalUnitProfitLoss);
    console.log('Total Number of Bets:', totalBets);
  }, [summary, totalStake, totalProfitLoss, totalUnitProfitLoss, totalBets, validBetCount, invalidBetCount, skippedRows]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Utility function to convert date strings from dd/mm/yyyy to Date objects
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return new Date(year, month - 1, day);
  };

  const sortedSummaryArray = [...summaryArray].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = sortConfig.key === 'date' ? parseDate(a[sortConfig.key]) : a[sortConfig.key];
    const bValue = sortConfig.key === 'date' ? parseDate(b[sortConfig.key]) : b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Handle date click to filter bets
  const handleDateClick = (date) => {
    if (selectedDate === date) {
      setSelectedDate(null); // If clicked again, reset filter
      onFilterChange(null); // Reset filter to show all bets
    } else {
      setSelectedDate(date);
      onFilterChange(date); // Filter bets by selected date
    }
  };

  return (
    <div className="summary-table-container">
      <h2>Summary by Day</h2>
      <table className="summary-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('date')}>Date</th>
            <th onClick={() => handleSort('stake')}>Stake</th>
            <th onClick={() => handleSort('profitLoss')}>P/L</th>
            <th onClick={() => handleSort('unitProfitLoss')}>Unit P/L</th>
            <th onClick={() => handleSort('numBets')}>No. Bets</th>
            <th onClick={() => handleSort('roi')}>ROI (%)</th>
          </tr>
        </thead>
        <tbody>
          {sortedSummaryArray.map((row, index) => (
            <tr
              key={index}
              className={row.profitLoss > 0 ? 'positive-row' : 'negative-row'}
              onClick={() => handleDateClick(row.date)} // Click to filter by date
              style={{ cursor: 'pointer', backgroundColor: row.date === selectedDate ? '#d3eafc' : '' }}
            >
              <td>{row.date}</td>
              <td>{row.stake.toFixed(2)}</td>
              <td>{row.profitLoss.toFixed(2)}</td>
              <td>{row.unitProfitLoss.toFixed(2)}</td>
              <td>{row.numBets}</td>
              <td>{((row.profitLoss / row.stake) * 100).toFixed(2)}%</td>
            </tr>
          ))}
          {/* Summary row (fixed position) */}
          <tr className={totalProfitLoss > 0 ? 'positive-row' : 'negative-row'} onClick={() => handleDateClick(null)} style={{ cursor: 'pointer' }}>
            <td>Total</td>
            <td>{totalStake.toFixed(2)}</td>
            <td>{totalProfitLoss.toFixed(2)}</td>
            <td>{totalUnitProfitLoss.toFixed(2)}</td>
            <td>{totalBets}</td>
            <td>{((totalProfitLoss / totalStake) * 100).toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SummaryByDay;
