import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import TransactionList from './components/TransactionList';
import TransactionGraph from './components/TransactionGraph';

function App() {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);
    const [selectedAmount, setSelectedAmount] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/customers')
        .then(response => {
            setCustomers(response.data);
        })
        .catch(error => console.error('Error fetching customers:', error));

        axios.get('http://localhost:8080/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => console.error('Error fetching transactions:', error));
    }, []);

    const filteredTransactionsByName = transactions.filter(t => t.customer_id == selectedCustomerId);
    const filteredTransactionsByAmount = transactions.filter(t => t.amount == selectedAmount);

    return (
        <div className="App">
            <div>
                <h1>List Customers and Transactions</h1>
                <CustomerTable customers={customers} transactions={transactions}/>
            </div>

            <div>
                <h1>List Transaction By user</h1>
                <select onChange={(e) => setSelectedCustomerId(e.target.value)}>
                    <option value="">Select a Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
                {selectedCustomerId && (
                    <>
                        <TransactionList transactions={filteredTransactionsByName}/>
                        <TransactionGraph transactions={filteredTransactionsByName}/>
                    </>
                )}
            </div>

            <div>
                <h1>List Transaction By user</h1>
                <input type={"text"} onChange={(e) => setSelectedAmount(e.target.value)}/>
                <TransactionList transactions={filteredTransactionsByAmount}/>
            </div>
        </div>
    );
}

export default App;