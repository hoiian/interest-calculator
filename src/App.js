import React from 'react';
import { LanguageProvider } from './LanguageContext';
import InterestCalculator from './InterestCalculator';

function App() {
  return (
    <LanguageProvider>
      <InterestCalculator />
    </LanguageProvider>
  );
}

export default App;
