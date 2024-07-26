import React, { createContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        calculate: 'Interest Calculator',
        principal: 'Principal Amount',
        rate: 'Annual Interest Rate (%)',
        startDate: 'Start Date',
        term: 'Term',
        endDate: 'End Date',
        result: 'Your calculated end date and interest amount',
        errorMessage: 'Please fill out all fields correctly',
        interest: 'Interest Amount',
      },
      zh: {
        calculate: '計算',
        principal: '本金金额',
        rate: '年利率 (%)',
        startDate: '起息日',
        term: '存款期',
        endDate: '到期日',
        result: '結果',
        errorMessage: '請填寫正確',
        interest: '利息',
      },
};

const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'zh' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
