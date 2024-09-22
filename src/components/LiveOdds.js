import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LiveOdds({ eventId }) { // Accept eventId as a prop
  const [odds, setOdds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API details
  const apiUrl = `https://sports-live-scores.p.rapidapi.com/get_odds/${eventId}`;
  const apiKey = '276a8c0736mshf09375fb00da8bap1572e3jsn0fb6089294a2'; // Your API key

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'x-rapidapi-host': 'sports-live-scores.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
          },
        });
        setOdds(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching live odds:", err);
        setError('Failed to fetch live odds');
        setLoading(false);
      }
    };

    fetchOdds();
  }, [eventId]); // Refetch if the eventId changes

  if (loading) {
    return <div>Loading live odds...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="live-odds">
      <h2>Live Odds for Event ID: {eventId}</h2>
      <ul>
        {odds && odds.length > 0 ? (
          odds.map((odd, index) => (
            <li key={index}>
              <strong>{odd.bookmaker}</strong>: {odd.odds} (Type: {odd.type})
            </li>
          ))
        ) : (
          <li>No odds available for this event.</li>
        )}
      </ul>
    </div>
  );
}

export default LiveOdds;
