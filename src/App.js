import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerTable from './components/CustomerTable';
import TransactionList from './components/TransactionList';
import TransactionGraph from './components/TransactionGraph';

function App() {
    const [customers, setCustomers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState(null);

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

    const filteredTransactions = transactions.filter(t => t.customer_id == selectedCustomerId);

    return (
        <div className="App">
            <h1>Customer and Transaction Data</h1>
                <CustomerTable customers={customers} transactions={transactions} />
                <select onChange={(e) => setSelectedCustomerId(e.target.value)}>
                    <option value="">Select a Customer</option>
                    {customers.map(customer => (
                        <option key={customer.id} value={customer.id}>{customer.name}</option>
                    ))}
                </select>
                {selectedCustomerId && (
                    <>
                    <TransactionList transactions={filteredTransactions} />
                    <TransactionGraph transactions={filteredTransactions} />
                </>
                )}
        </div>
    );
}

export default App;