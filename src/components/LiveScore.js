import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LiveScore({ eventId }) {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://sports-live-scores.p.rapidapi.com/get_odds/${eventId}`;
  const apiKey = 'YOUR_API_KEY'; // Replace with your API key

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'x-rapidapi-host': 'sports-live-scores.p.rapidapi.com',
            'x-rapidapi-key': apiKey,
          },
        });
        setScore(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching live scores:", err);
        setError('Failed to fetch live scores');
        setLoading(false);
      }
    };

    if (eventId) {
      fetchScore();
    }
  }, [eventId]);

  if (loading) return <div>Loading live score...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="live-score">
      <h2>Live Score for Event ID: {eventId}</h2>
      {score ? (
        <ul>
          {score.map((odds, index) => (
            <li key={index}>
              <strong>{odds.bookmaker}</strong>: {odds.odds} (Type: {odds.type})
            </li>
          ))}
        </ul>
      ) : (
        <p>No live score available for this event.</p>
      )}
    </div>
  );
}

export default LiveScore;
