import React from 'react';
import TransactionList from "./TransactionList";

const CustomerTable = ({ customers, transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Transaction</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
            <td>
                <TransactionList transactions={transactions.filter((transaction) =>  transaction.customer_id == customer.id)}></TransactionList>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;