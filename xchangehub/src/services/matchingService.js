import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const matchingService = {
  // Find matching items for exchange
  async findExchangeMatches(itemId, userExchangeValue, category = null) {
    try {
      const q = query(
        collection(db, 'items'),
        where('listingType', '==', 'exchange'),
        where('status', '==', 'available'),
        where('sellerId', '!=', 'user-id-here') // Exclude own items
      );

      const querySnapshot = await getDocs(q);
      const allExchangeItems = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Find items with similar exchange values (±15%)
      const matches = allExchangeItems.filter(otherItem => {
        const valueDiff = Math.abs(otherItem.exchangeValue - userExchangeValue);
        const maxDiff = userExchangeValue * 0.15; // 15% tolerance
        
        // Optional: category preference
        const categoryMatch = !category || otherItem.category === category;
        
        return valueDiff <= maxDiff && categoryMatch && otherItem.id !== itemId;
      });

      // Sort by closest value match
      matches.sort((a, b) => {
        const diffA = Math.abs(a.exchangeValue - userExchangeValue);
        const diffB = Math.abs(b.exchangeValue - userExchangeValue);
        return diffA - diffB;
      });

      return matches;
    } catch (error) {
      console.error('Error finding matches:', error);
      return [];
    }
  },

  // Calculate match quality score (0-100)
  calculateMatchQuality(userItem, otherItem) {
    const valueDiff = Math.abs(userItem.exchangeValue - otherItem.exchangeValue);
    const valueScore = Math.max(0, 100 - (valueDiff / userItem.exchangeValue) * 100);
    
    const categoryScore = userItem.category === otherItem.category ? 20 : 0;
    
    return Math.min(100, valueScore + categoryScore);
  }
};