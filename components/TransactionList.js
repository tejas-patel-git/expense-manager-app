import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recent transactions</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>
      <View style={styles.listWrapper}>
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  listWrapper: {
    backgroundColor: '#fafafa', // Subtle off-white background
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8', // Light, subtle border
    overflow: 'hidden', // Ensures rounded corners clip content
  },
  listContent: {
    paddingVertical: 5,
    paddingHorizontal: 5, // Slight inner padding for breathing room
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  emptyText: {
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
});

export default TransactionList;