import React, { useEffect, useState } from 'react';
import { fetchData /*, fetchLiveFootballEvents, mapEventsToCustomIDs*/ } from './utils/api';
import UnsettledBets from './components/UnsettledBets';
import AllBets from './components/AllBets';
import CumulativeGraph from './components/CumulativeGraph';
import ProfitLossGraph from './components/ProfitLossGraph';
import SummaryBySport from './components/SummaryBySport';
import SummaryByDay from './components/SummaryByDay';
import MovingAverageChart from './components/MovingAverageChart';
// import LiveScore from './components/LiveScore'; // Commented out LiveScore component
import './styles/App.css';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('all');
  const [filteredSport, setFilteredSport] = useState(null); // State to track selected sport
  const [filteredDate, setFilteredDate] = useState(null); // State to track selected date
  // const [selectedEventId, setSelectedEventId] = useState(''); // Commented out state for selected event ID
  // const [mappedData, setMappedData] = useState([]); // Commented out state for mapped events with IDs

  useEffect(() => {
    const getData = async () => {
      const sheetData = await fetchData();
      setData(sheetData);
      setLoading(false);
    };
    getData();
  }, []);

  // Utility function to convert date format from dd/mm/yyyy to yyyy-mm-dd
  const convertDateFormat = (dateStr) => {
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
  };

  // Filtering the data based on selected sport or date
  const filteredData = data.filter((bet) => {
    // Sport and date filtering
    const isSportFiltered = filteredSport ? bet[3] === filteredSport : true;
    const isDateFiltered = filteredDate ? bet[0] === filteredDate : true; // Compare with original date format

    return isSportFiltered && isDateFiltered;
  });

  // Handle sport filter change
  const handleSportFilter = (sport) => {
    setFilteredSport(sport);
    setFilteredDate(null);
    setView('all');
  };

  // Handle date filter change
  const handleDateFilter = (date) => {
    setFilteredDate(date); // Use the original dd/mm/yyyy format for comparison
    setFilteredSport(null);
    setView('all');
  };

  // Reset all filters
  const resetFilters = () => {
    setFilteredSport(null);
    setFilteredDate(null);
    setView('all');
  };

  // Function to set the selected event ID for live scores (commented out)
  /*
  const handleEventSelect = (eventId) => {
    setSelectedEventId(eventId);
    setView('liveScore');
  };
  */

  // Function to handle clicking on a bet to show its live score (if available) (commented out)
  /*
  const handleBetClick = (bet) => {
    if (bet.liveEventId) {
      handleEventSelect(bet.liveEventId); // Set the live event ID from the mapped data
    } else {
      alert('No live event ID associated with this bet.');
    }
  };
  */

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Welcome to the Betting Tips App!</h1>

      {/* Buttons to switch between different views */}
      <div className="view-toggle">
        <button onClick={() => setView('all')}>All Bets</button>
        <button onClick={() => setView('unsettled')}>Unsettled Bets</button>
        <button onClick={() => setView('bySport')}>Summary by Sport</button>
        <button onClick={() => setView('byDay')}>Summary by Day</button>
        <button onClick={() => setView('graph')}>Cumulative Graph</button>
        <button onClick={() => setView('profitLossGraph')}>Profit & Loss Graph</button>
        <button onClick={() => setView('movingAverage')}>Moving Average Chart</button>
        {/* <button onClick={() => handleEventSelect('11352563')}>Live Score</button>  Button for Live Score */}
      </div>

      {/* Conditionally render components based on the selected view */}
      {view === 'all' && <AllBets data={filteredData} /* onBetClick={handleBetClick} *//>}
      {view === 'unsettled' && <UnsettledBets data={filteredData} /* onBetClick={handleBetClick} *//>}
      {view === 'bySport' && <SummaryBySport data={data} onSportClick={handleSportFilter} />}
      {view === 'byDay' && <SummaryByDay data={data} onFilterChange={handleDateFilter} />}
      {view === 'graph' && <CumulativeGraph data={data} />}
      {view === 'profitLossGraph' && <ProfitLossGraph data={data} />}
      {view === 'movingAverage' && <MovingAverageChart data={data} />}
      {/* {view === 'liveScore' && <LiveScore eventId={selectedEventId} />} Render the LiveScore component */}

      {/* Reset Filter Button */}
      <button onClick={resetFilters} style={{ marginTop: '20px' }}>
        Reset Filters
      </button>
    </div>
  );
}

export default App;
