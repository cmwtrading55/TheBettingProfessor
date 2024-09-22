import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Ensure this import is correct
import 'react-datepicker/dist/react-datepicker.css'; // Ensure the CSS import is correct

function DateFilter({ onFilterChange }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = () => {
    if (onFilterChange) {
      onFilterChange({ startDate, endDate });
    }
  };

  return (
    <div className="date-filter">
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          handleDateChange();
        }}
        placeholderText="Start Date"
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date);
          handleDateChange();
        }}
        placeholderText="End Date"
      />
    </div>
  );
}

export default DateFilter;
