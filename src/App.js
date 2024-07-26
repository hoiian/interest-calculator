import React, { useState } from 'react';
import './App.css';

// Get today's date in YYYY-MM-DD format
const today = new Date().toISOString().split('T')[0];

function App() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [startDate, setStartDate] = useState(today); // Default to today's date
  const [timePeriod, setTimePeriod] = useState('');
  const [timeUnit, setTimeUnit] = useState('days');
  const [interest, setInterest] = useState(null);
  const [maturityDate, setMaturityDate] = useState(null);

  const calculateInterestAndMaturity = () => {
    if (principal && rate && startDate && timePeriod) {
      const timeInYears = convertToYears(timePeriod, timeUnit);
      const calculatedInterest = (principal * rate * timeInYears) / 100;
      setInterest(calculatedInterest);
      
      const maturity = calculateMaturityDate(startDate, timePeriod, timeUnit);
      setMaturityDate(maturity);
    }
  };

  const convertToYears = (timePeriod, timeUnit) => {
    switch (timeUnit) {
      case 'days':
        return timePeriod / 365;
      case 'months':
        return timePeriod / 12;
      case 'years':
        return timePeriod;
      default:
        return 0;
    }
  };

  const calculateMaturityDate = (startDate, timePeriod, timeUnit) => {
    const start = new Date(startDate);
    switch (timeUnit) {
      case 'days':
        start.setDate(start.getDate() + parseInt(timePeriod));
        break;
      case 'months':
        start.setMonth(start.getMonth() + parseInt(timePeriod));
        break;
      case 'years':
        start.setFullYear(start.getFullYear() + parseInt(timePeriod));
        break;
      default:
        break;
    }
    return start.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  };

  return (
    <div className="App">
      <h1>Interest Calculator</h1>
      <div>
        <label>
          Principal:
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter principal amount"
          />
        </label>
      </div>
      <div>
        <label>
          Annual Interest Rate (%):
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter annual interest rate"
          />
        </label>
      </div>
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder="Select start date"
          />
        </label>
      </div>
      <div>
        <label>
          Time Period:
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
            placeholder="Enter time period"
          />
          <select value={timeUnit} onChange={(e) => setTimeUnit(e.target.value)}>
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </label>
      </div>
      <button onClick={calculateInterestAndMaturity}>Calculate</button>
      {interest !== null && (
        <div>
          <h2>Calculated Interest: {interest}</h2>
        </div>
      )}
      {maturityDate && (
        <div>
          <h2>Maturity Date: {maturityDate}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
