import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransactionItem = ({ transaction }) => {
  const { description, amount, date } = transaction;
  const isPositive = amount >= 0;
  const color = isPositive ? '#2ecc71' : '#e74c3c'; // Vibrant green and red
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={styles.item}>
      {/* Left: Description and date */}
      <View style={styles.left}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>

      {/* Right: Amount */}
      <Text style={[styles.amount, { color }]}>
        {isPositive ? '+' : ''}{amount.toFixed(2)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Light separator
  },
  left: {
    flex: 1, // Allows description to take available space
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TransactionItem;