import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TransactionList from './TransactionList';

const Dashboard = () => {
  // Sample transactions with id, amount, description, and date
  const [transactions, setTransactions] = useState([
    { id: 1, amount: 100, description: 'Salary', date: new Date('2023-01-01') },
    { id: 2, amount: -50, description: 'Groceries', date: new Date('2023-01-02') },
    { id: 3, amount: -20, description: 'Coffee', date: new Date('2023-01-03') },
    { id: 4, amount: 200, description: 'Bonus', date: new Date('2023-01-04') },
    { id: 5, amount: -30, description: 'Lunch', date: new Date('2023-01-05') },
    { id: 6, amount: -10, description: 'Transport', date: new Date('2023-01-06') },
  ]);

  // Calculate balance by summing all transaction amounts
  const balance = transactions.reduce((acc, tx) => acc + tx.amount, 0);

  // Sort transactions by date descending and take the last 5
  const lastFive = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: {balance}</Text>
      <Text style={styles.header}>Recent Transactions</Text>
      <TransactionList transactions={lastFive} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
});

export default Dashboard;