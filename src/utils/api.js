import axios from 'axios';

// Google Sheets API constants
const SHEET_ID = '1aj-xt9lKz8tux2LhaHjVDhjCT3TKlaf1xdoOjLKJxtU'; // Your Google Sheet ID
const API_KEY = 'AIzaSyCpQeGu5ttgs7nRF6bgTfK08CssTjkOAYI'; // Your Google Sheets API key
const RANGE = 'Betting%20Tips!A:AN'; // The dynamic range covering all rows in columns A to AN

// Sports Live Scores API constants (commented out)
/*
const RAPIDAPI_HOST = 'sports-live-scores.p.rapidapi.com';
const RAPIDAPI_KEY = '276a8c0736mshf09375fb00da8bap1572e3jsn0fb6089294a2';
const BASE_URL = 'https://sports-live-scores.p.rapidapi.com';
*/

/**
 * Fetch data from Google Sheets
 * @returns {Array} - An array of rows from the Google Sheet
 */
export const fetchData = async () => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  console.log('Fetching URL:', url);

  try {
    const response = await axios.get(url);
    console.log('API Response:', response);
    console.log('Data Values:', response.data.values);
    return response.data.values;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

/**
 * Fetch live football events from Sports Live Scores API (commented out)
 */
/*
export const fetchLiveFootballEvents = async () => {
  const url = `${BASE_URL}/football/live_matches`;
  console.log('Fetching Live Football Events URL:', url);

  try {
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Live Football Events API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching live football events:', error);
    return [];
  }
};
*/

/**
 * Fetch odds for a specific event by Event ID (commented out)
 */
/*
export const fetchEventOdds = async (eventId) => {
  const url = `${BASE_URL}/get_odds/${eventId}`;
  console.log(`Fetching Odds for Event ID ${eventId}:`, url);

  try {
    const response = await axios.get(url, {
      headers: {
        'x-rapidapi-host': RAPIDAPI_HOST,
        'x-rapidapi-key': RAPIDAPI_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(`Odds API Response for Event ID ${eventId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching odds for event ID ${eventId}:`, error);
    return null;
  }
};
*/

/**
 * Map custom event IDs to Sports Live Scores event IDs (commented out)
 */
/*
export const mapEventsToCustomIDs = (customEvents, liveEvents) => {
  return customEvents.map((customEvent) => {
    const [date, , , sport, team1, team2] = customEvent; // Extract relevant fields (adjust based on your data structure)

    // Try to find a matching live event based on date, sport, and teams
    const matchingEvent = liveEvents.find((liveEvent) => {
      // Extract relevant data from live event
      const liveDate = new Date(liveEvent["Date"]).toLocaleDateString('en-GB'); // Convert to 'dd/mm/yyyy' format
      const liveSport = liveEvent["Sport"]; // Assuming live events include sport info
      const liveTeam1 = liveEvent["Team 1"].toLowerCase();
      const liveTeam2 = liveEvent["Team 2"].toLowerCase();

      // Compare sport, date, and team names (case-insensitive)
      return (
        sport.toLowerCase() === liveSport.toLowerCase() &&
        date === liveDate &&
        (team1.toLowerCase() === liveTeam1 || team1.toLowerCase() === liveTeam2) &&
        (team2.toLowerCase() === liveTeam1 || team2.toLowerCase() === liveTeam2)
      );
    });

    // If a matching event is found, add the live event ID to the custom event data
    if (matchingEvent) {
      return { ...customEvent, liveEventId: matchingEvent["Match Id"] };
    }

    // Return the custom event as-is if no matching live event is found
    return { ...customEvent, liveEventId: null };
  });
};
*/

/**
 * Log mapped events to the console for testing (commented out)
 */
/*
export const logMappedEvents = async () => {
  const customEvents = await fetchData(); // Fetch your custom events data
  const liveEvents = await fetchLiveFootballEvents(); // Fetch live football events
  const mappedEvents = mapEventsToCustomIDs(customEvents, liveEvents); // Map the custom events to live events
  console.log('Mapped Events:', mappedEvents); // Log the mapped events to the console
};
*/
