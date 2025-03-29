const BASE_URL = 'http://ec2-13-126-224-114.ap-south-1.compute.amazonaws.com:5000/api';

/**
 * Fetch transactions from the API.
 * @param {string} token - The access token for authentication.
 * @returns {Promise<Array>} List of transactions.
 */
export const fetchTransactions = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/transaction`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`API returned status ${response.status}`);
    }

    const result = await response.json();
    if (result.success) {
      return result.data.map((transaction) => ({
        id: transaction.transactionId,
        amount: transaction.amount,
        description: transaction.description,
        date: new Date(transaction.date),
        isExpense: transaction.isExpense,
      }));
    } else {
      console.error('Failed to fetch transactions:', result);
      return [];
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};