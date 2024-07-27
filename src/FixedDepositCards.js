import React from 'react';

const FixedDepositCards = () => {
  const fixedDeposits = [
    // {
    //   bankName: '中銀',
    //   productName: '智能存',
    //   currency: 'MOP',
    //   amount: 100000,
    //   interestRate: 3.3, // 存储为数字格式，不带%
    //   termValue: 3,
    //   termUnit: '個月',
    //   startDate: '2024-06-01',
    // },
    {
      bankName: '工銀',
      productName: 'e豐富',
      currency: 'CNY',
      amount: 10000,
      interestRate: 2.3, 
      termValue: 183,
      termUnit: '天',
      startDate: '2024-01-29',
    },
    {
      bankName: '工銀',
      productName: 'e豐富',
      currency: 'MOP',
      amount: 23000,
      interestRate: 3.3, 
      termValue: 92,
      termUnit: '天',
      startDate: '2024-05-01',
    },
    {
      bankName: '立橋',
      productName: '定期存款',
      currency: 'MOP',
      amount: 20260,
      interestRate: 4.15, 
      termValue: 1,
      termUnit: '年',
      startDate: '2023-09-12',
    },
    {
      bankName: '工銀',
      productName: 'e豐富',
      currency: 'CNY',
      amount: 10058,
      interestRate: 2.4, 
      termValue: 365,
      termUnit: '天',
      startDate: '2024-03-20',
    },

  ];

  const calculateTermInDays = (termValue, termUnit) => {
    switch (termUnit) {
      case '天':
        return termValue;
      case '個月':
        return termValue * 30; // Approximation for simplicity
      case '年':
        return termValue * 365;
      default:
        return 0;
    }
  };

  const calculateRemainingDaysAndProgress = (startDate, termValue, termUnit) => {
    const now = new Date();
    const start = new Date(startDate);
    const termInDays = calculateTermInDays(termValue, termUnit);
    const maturityDate = new Date(start);
    maturityDate.setDate(maturityDate.getDate() + termInDays);
    
    const timeDifference = maturityDate - now;
    const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const totalDays = (maturityDate - start) / (1000 * 60 * 60 * 24);
    const progress = ((totalDays - remainingDays) / totalDays) * 100;

    return { remainingDays: remainingDays <= 0 ? '已到期' : remainingDays, progress };
  };

  const calculateInterest = (amount, interestRate, termValue, termUnit) => {
    const principalAmount = parseFloat(amount);
    const rate = parseFloat(interestRate);
    const termInDays = calculateTermInDays(termValue, termUnit);
    return ((principalAmount * rate * termInDays) / 366 / 100).toFixed(2);
  };

  return (
    <div className="fixed-deposit-cards-container">
      {fixedDeposits.map((deposit, index) => {
        const { remainingDays, progress } = calculateRemainingDaysAndProgress(deposit.startDate, deposit.termValue, deposit.termUnit);
        const interest = calculateInterest(deposit.amount, deposit.interestRate, deposit.termValue, deposit.termUnit);

        return (
          <div key={index} className="fixed-deposit-card">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
            <div className="left-side">
              <div className="labels">
                <span className="bank-label">{deposit.bankName}</span>
                <span className="product-label">{deposit.productName}</span>
              </div>
              <div className="principal">
                {deposit.currency} {deposit.amount.toLocaleString()}
              </div>
              <div className="interest-rate-term">
                {deposit.interestRate}% / {deposit.termValue} {deposit.termUnit}
              </div>
            </div>
            <div className="right-side">
              <div className="remaining-days">
                {typeof remainingDays === 'number' ? `${remainingDays}天後` : '已到期'}
              </div>
              <div className="interest">利息: {interest}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FixedDepositCards;
