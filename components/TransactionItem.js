import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

const TransactionItem = ({ transaction, isLast }) => {
  const { description, amount, date } = transaction;
  const isPositive = amount >= 0;
  const color = isPositive ? COLORS.accentPositive : COLORS.accentNegative;
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  return (
    <View style={[styles.item, isLast && styles.noBorder]}>
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
    borderBottomColor: COLORS.separator,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  left: {
    flex: 1,
  },
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
});

export default TransactionItem;