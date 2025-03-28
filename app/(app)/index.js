import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import BalanceCard from '../../components/balanceCard'; // Updated path
import TransactionList from '../../components/TransactionList'; // Updated path
import { COLORS } from '../../constants/colors'; // Updated path
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

const Index = () => {
  const { user, clearSession } = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
      router.replace('/login');
    } catch (e) {
      console.error('Logout Error:', e);
    }
  };

  const [transactions] = useState([
    { id: 1, amount: 100, description: 'Salary', date: new Date('2023-01-01') },
    { id: 2, amount: -50, description: 'Groceries', date: new Date('2023-01-02') },
    { id: 3, amount: -20, description: 'Coffee', date: new Date('2023-01-03') },
    { id: 4, amount: 200, description: 'Bonus', date: new Date('2023-01-04') },
    { id: 5, amount: -30, description: 'Lunch', date: new Date('2023-01-05') },
    { id: 6, amount: -10, description: 'Transport', date: new Date('2023-01-06') },
  ]);

  const lastFive = [...transactions]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const balances = [
    { type: 'Total Balance', amount: 1450.75 },
    { type: 'Savings Balance', amount: 820.30 },
    { type: 'Account 1 Balance', amount: 500.20 },
    { type: 'Account 2 Balance', amount: 130.25 },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <BalanceCard balances={balances} />
        </View>
        <TransactionList transactions={lastFive} />
        <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>
        <Text style={styles.title}>Dashboard</Text>
        <Button onPress={onLogout} title="Log Out" />
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Index;