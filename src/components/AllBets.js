import React from 'react';
import TableHeader from './TableHeader';
import '../styles/App.css'; // Ensure the path is correct

function AllBets({ data }) {
  return (
    <div className="all-bets">
      <h2>All Bets</h2>
      <table>
        <TableHeader /> {/* Ensure TableHeader only contains <thead> and <tr> elements */}
        <tbody>
          {data.slice(1).map((bet, index) => {
            // Check for the value of the "Result" column (assuming index 8; adjust if necessary)
            const resultColumnIndex = 8; // Update this index if "W/L" is in a different position
            const result = bet[resultColumnIndex]?.toUpperCase();
            let rowClassName = '';

            if (result === 'W') {
              rowClassName = 'win-row';
            } else if (result === 'L') {
              rowClassName = 'lose-row';
            } else if (result === 'V') {
              rowClassName = 'void-row';
            } else {
              rowClassName = 'neutral-row';
            }

            return (
              <tr key={index} className={rowClassName}>
                {bet.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllBets;
