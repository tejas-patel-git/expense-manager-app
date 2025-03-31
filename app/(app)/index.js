import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, ActivityIndicator } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import BalanceCard from '../../components/balanceCard';
import TransactionList from '../../components/TransactionList';
import { COLORS } from '../../constants/colors';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { fetchTransactions } from '../../services/api';

const Index = () => {
  const { user, clearSession, getCredentials } = useAuth0(); // Use getCredentials from the hook
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const onLogout = async () => {
    try {
      await clearSession();
      router.replace('/login');
    } catch (e) {
      console.error('Logout Error:', e);
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const credentials = await getCredentials(); // Retrieve the token
        const data = await fetchTransactions(credentials.accessToken); // Pass the token to the API
        setTransactions(data);
      } catch (error) {
        console.error('Error loading transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const balances = [
    { type: 'Total Balance', amount: 1450.75 },
    { type: 'Savings Balance', amount: 820.30 },
  ];

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={styles.cardContainer}>
          <BalanceCard balances={balances} />
        </View>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.accentPositive} />
        ) : (
          <TransactionList transactions={transactions} />
        )}
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
  },
});

export default Index;