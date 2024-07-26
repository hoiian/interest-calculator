import React, { createContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        calculate: 'HoiIan\'s Interest Calculator',
        principal: 'Principal Amount',
        rate: 'Annual Interest Rate (%)',
        startDate: 'Start Date',
        term: 'Term',
        endDate: 'End Date',
        result: 'Result',
        errorMessage: 'Please fill out all fields correctly',
        interest: 'Interest Amount',
        submit: "Submit",
        days: "Days",
        months: "Months",
        years: "Years"
      },
      zh: {
        calculate: '黃凱欣的定存計算器',
        principal: '本金',
        rate: '年利率 (%)',
        startDate: '起息日',
        term: '存款期',
        endDate: '到期日',
        result: '結果',
        errorMessage: '請填寫正確',
        interest: '利息',
        submit: "計算",
        days: "日",
        months: "月",
        years: "年"
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
