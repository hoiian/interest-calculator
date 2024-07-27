import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import InterestCalculator from './InterestCalculator';
import FixedDepositCards from './FixedDepositCards';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <nav>
              <ul>
                <li><Link to="/">Interest Calculator</Link></li>
                <li><Link to="/fixed-deposits">Fixed Deposits</Link></li>
              </ul>
            </nav>
          </header>
          <main>
            <Routes>
              <Route path="/" element={<InterestCalculator />} />
              <Route path="/fixed-deposits" element={<FixedDepositCards />} />
            </Routes>
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
