import React, { useState, useContext } from 'react';
import { LanguageContext } from './LanguageContext';
import './styles.css'; // Import the CSS file

const InterestCalculator = () => {
  const { language, translations, toggleLanguage } = useContext(LanguageContext);
  const t = translations[language];

  // State variables for form inputs and results
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Default to today
  const [term, setTerm] = useState('');
  const [termUnit, setTermUnit] = useState('days');
  const [endDate, setEndDate] = useState('');
  const [interest, setInterest] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse input values
    const principalAmount = parseFloat(principal);
    const annualRate = parseFloat(rate) / 100;
    const termValue = parseInt(term);
    
    if (!principalAmount || !annualRate || !termValue) {
      alert(t.errorMessage);
      return;
    }

    // Calculate the end date based on the term and start date
    const start = new Date(startDate);
    let end;

    switch (termUnit) {
      case 'days':
        end = new Date(start.setDate(start.getDate() + termValue));
        break;
      case 'months':
        end = new Date(start.setMonth(start.getMonth() + termValue));
        break;
      case 'years':
        end = new Date(start.setFullYear(start.getFullYear() + termValue));
        break;
      default:
        end = start;
    }

    setEndDate(end.toISOString().split('T')[0]);

    // Calculate the interest amount
    const timeInYears = termUnit === 'days' ? termValue / 365 : termUnit === 'months' ? termValue / 12 : termValue;
    const interestAmount = principalAmount * annualRate * timeInYears;
    setInterest(interestAmount.toFixed(2));
  };

  return (
    <div className="container">
      <button className="toggle-btn" onClick={toggleLanguage}>
        {language === 'en' ? '中文' : 'English'}
      </button>
      <h1>{t.calculate}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span>{t.principal}:</span>
          <input
            type="number"
            name="principal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            required
          />
        </label>
        <label>
          <span>{t.rate}:</span>
          <input
            type="number"
            name="rate"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </label>
        <label>
          <span>{t.startDate}:</span>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          {/* <span> (Today)</span> */}
        </label>
        <label>
          <span>{t.term}:</span>
          <input
            type="number"
            name="term"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            required
          />
          <select
            name="termUnit"
            value={termUnit}
            onChange={(e) => setTermUnit(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </label>
        <button type="submit">{t.submit}</button>
      </form>
      {endDate && (
        <div className="result">
          <h2>{t.result}</h2>
          <p>{t.endDate}: {endDate}</p>
          <p>{t.interest}: ${interest}</p> {/* Show interest amount */}
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
