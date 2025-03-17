import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';

// Utility function to format date and time
const formatDateTime = (date) => ({
  date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  time: date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
});

// Map descriptions to emojis/icons
const getTransactionIcon = (description) => {
  const desc = description.toLowerCase();

  if (desc.includes('food') || desc.includes('restaurant') || desc.includes('dinner')) return '🍽️';
  if (desc.includes('grocery') || desc.includes('supermarket')) return '🛒';
  if (desc.includes('salary') || desc.includes('paycheck') || desc.includes('income')) return '💰';
  if (desc.includes('rent') || desc.includes('mortgage') || desc.includes('housing')) return '🏠';
  if (desc.includes('transport') || desc.includes('gas') || desc.includes('fuel')) return '⛽';
  if (desc.includes('shopping') || desc.includes('purchase')) return '🛍️';
  if (desc.includes('bill') || desc.includes('utility') || desc.includes('electricity')) return '💡';
  if (desc.includes('subscription') || desc.includes('netflix') || desc.includes('streaming')) return '📺';
  if (desc.includes('transfer') || desc.includes('payment')) return '💸';
  return '💵'; // Default icon for unknown transactions
};

const TransactionItem = memo(({ transaction, isLast }) => {
  const { description, amount, date } = transaction;
  const isPositive = amount >= 0;
  const { date: formattedDate, time } = formatDateTime(date);
  const icon = getTransactionIcon(description);

  return (
    <View style={[styles.item, isLast && styles.noBorder]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.left}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>
          {formattedDate} · <Text style={styles.time}>{time}</Text>
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          { color: isPositive ? COLORS.accentPositive : COLORS.accentNegative }
        ]}
      >
        {isPositive ? '+' : ''}{amount.toFixed(2)}
      </Text>
    </View>
  );
});

TransactionItem.displayName = 'TransactionItem';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: COLORS.separator,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  iconContainer: {
    width: 30, // Fixed width for consistent spacing
    alignItems: 'center',
    marginRight: 8,
  },
  icon: {
    fontSize: 20,
  },
  left: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  time: {
    color: COLORS.textSecondary,
    opacity: 0.7,
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
  },
});

export default TransactionItem;