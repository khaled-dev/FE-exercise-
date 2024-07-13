import React from 'react';

const TransactionList = ({ transactions }) => {

  return (
    <ul>
      {transactions.map(transaction => (
        <li key={transaction.id}> name: {`${transaction.customer_id}, amount: ${transaction.amount}, at: ${transaction.date} `}</li>
      ))}
    </ul>
  );
};

export default TransactionList;