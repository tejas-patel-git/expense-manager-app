import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { COLORS } from '../constants/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.85;

const BalanceCard = ({ balances }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardHeader}>Balances</Text>
      <ScrollView 
        style={{ flexGrow: 0 }} 
        contentContainerStyle={{ maxHeight: 150 }} 
        nestedScrollEnabled
      >
        {balances.map((balance) => (
          <View key={balance.id || balance.type} style={styles.balanceItem}>
            <Text style={styles.balanceType}>{balance.type}</Text>
            <Text style={styles.balanceAmount}>
              ${balance.amount?.toFixed(2) ?? '0.00'}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    padding: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  cardHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 15,
  },
  balanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  balanceType: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textHeader,
  },
  balanceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
});

export default BalanceCard;
