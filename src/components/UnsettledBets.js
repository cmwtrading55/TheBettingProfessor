import React from 'react';
import TableHeader from './TableHeader';
import '../styles/App.css'; // Ensure the path is correct

function UnsettledBets({ data }) {
  const unsettledBets = data.slice(1).filter(bet => !bet[8]); // Adjust according to your structure

  // Define the index of the OC Link column (replace with the correct index)
  const ocLinkColumnIndex = 16; // Adjust this index based on your data structure

  // Calculate the total number of unsettled bets
  const totalUnsettledBets = unsettledBets.length;

  // Calculate total stake of unsettled bets
  const totalUnsettledStake = unsettledBets.reduce((acc, bet) => acc + parseFloat(bet[2] || 0), 0);

  // Calculate number of bets and total stake by sport
  const betsBySport = unsettledBets.reduce((acc, bet) => {
    const sport = bet[3]; // Assuming sport is in column 3
    const stake = parseFloat(bet[2] || 0); // Assuming stake is in column 2

    if (!acc[sport]) {
      acc[sport] = { count: 0, stake: 0 };
    }

    acc[sport].count += 1;
    acc[sport].stake += stake;

    return acc;
  }, {});

  // Calculate total counts and stake across all sports
  const totalCountBySport = Object.values(betsBySport).reduce((acc, sportData) => acc + sportData.count, 0);
  const totalStakeBySport = Object.values(betsBySport).reduce((acc, sportData) => acc + sportData.stake, 0);

  return (
    <div className="unsettled-bets">
      <h2>Unsettled Bets</h2>

      {/* Summary Section */}
      <div className="unsettled-summary">
        <p><strong>Total Unsettled Bets:</strong> {totalUnsettledBets}</p>
        <p><strong>Total Unsettled Stake:</strong> {totalUnsettledStake.toFixed(2)}</p>

        <h3>Unsettled Bets by Sport</h3>
        <table className="summary-table">
          <thead>
            <tr>
              <th>Sport</th>
              <th>Number of Bets</th>
              <th>Total Stake</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(betsBySport).map(([sport, { count, stake }]) => (
              <tr key={sport}>
                <td>{sport}</td>
                <td>{count}</td>
                <td>{stake.toFixed(2)}</td>
              </tr>
            ))}
            {/* Summary row at the bottom */}
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>{totalCountBySport}</strong></td>
              <td><strong>{totalStakeBySport.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Unsettled Bets Table */}
      <table>
        <TableHeader /> {/* Ensure TableHeader only contains <thead> and <tr> elements */}
        <tbody>
          {unsettledBets.length === 0 ? (
            <tr>
              <td colSpan="39">No unsettled bets</td> {/* Adjust colSpan as needed */}
            </tr>
          ) : (
            unsettledBets.map((bet, index) => (
              <tr key={index}>
                {bet.map((cell, i) => (
                  <td key={i}>
                    {i === ocLinkColumnIndex ? (
                      // Display as hyperlink if it is in the OC Link column
                      <a href={cell} target="_blank" rel="noopener noreferrer">
                        {cell ? 'OC Link' : 'No Link'}
                      </a>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UnsettledBets;
