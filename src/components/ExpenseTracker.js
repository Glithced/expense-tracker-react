import { useState } from 'react';

export default function ExpenseTracker() {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [transactions, setTransactions] = useState([]);

    const addTransaction = (e) => {
        e.preventDefault();
        if (!text || !amount) return;

        const newTransaction = {
            id: Date.now(),
            text,
            amount: parseFloat(amount)
        };

        setTransactions([...transactions, newTransaction]);
        setText('');
        setAmount('');
    };

    const deleteTransaction = (id) => {
        setTransactions(transactions.filter(t => t.id !== id));
    };

    const total = transactions.reduce((acc, t) => acc + t.amount, 0);
    const income = transactions
        .filter(t => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0);
    const expense = transactions
        .filter(t => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0);

    return (
        <div className="container">
            <h1>Expense Tracker</h1>

            <div className="balance">
                <h2>Your Balance</h2>
                <div className="balance-amount" style={{ color: total >= 0 ? '#27ae60' : '#e74c3c' }}>
                    ${total.toFixed(2)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '16px' }}>
                    <div>
                        <p>Income</p>
                        <p className="income">${income.toFixed(2)}</p>
                    </div>
                    <div>
                        <p>Expense</p>
                        <p className="expense">${Math.abs(expense).toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <form onSubmit={addTransaction}>
                <input
                    type="text"
                    placeholder="What did you spend on? (Rent, Salary...)"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount (positive = income, negative = expense)"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    step="0.01"
                />
                <button type="submit">Add Transaction</button>
            </form>

            <div className="list">
                <h3>History</h3>
                {transactions.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#95a5a6' }}>No transactions yet</p>
                ) : (
                    transactions.map(t => (
                        <div key={t.id} className={`transaction ${t.amount < 0 ? 'exp' : 'inc'}`}>
                            <span>{t.text}</span>
                            <div>
                                <span>${t.amount.toFixed(2)}</span>
                                <button className="delete" onClick={() => deleteTransaction(t.id)}>×</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}