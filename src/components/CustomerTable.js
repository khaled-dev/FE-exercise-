import React from 'react';

const CustomerTable = ({ customers, transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {customers.map(customer => (
          <tr key={customer.id}>
            <td>{customer.id}</td>
            <td>{customer.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;