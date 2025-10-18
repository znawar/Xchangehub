//  QV8HE0BGKUZEYFVP
const API_KEY = 'QV8HE0BGKUZEYFVP';
const BASE_URL = 'https://www.alphavantage.co/query';

export const stockService = {
  // Get market data for valuation
  async getMarketIndex() {
    try {
      // Use tech-heavy indices for better electronics valuation
      const symbols = ['QQQ', 'XLK', 'VGT']; // NASDAQ, Tech Sector, IT Sector
      const responses = await Promise.all(
        symbols.map(symbol => 
          fetch(`${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
            .then(response => response.json())
        )
      );

      let totalValue = 0;
      let validResponses = 0;

      responses.forEach((data) => {
        if (data['Global Quote'] && data['Global Quote']['05. price']) {
          totalValue += parseFloat(data['Global Quote']['05. price']);
          validResponses++;
        }
      });

      const averageIndex = validResponses > 0 ? totalValue / validResponses : 350;
      
      return {
        indexValue: averageIndex,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error fetching market data:', error);
      return {
        indexValue: 350, // Reasonable fallback
        timestamp: new Date().toISOString(),
        isFallback: true
      };
    }
  },

  // Smart item valuation based on category and condition
  async calculateItemValue(category, condition) {
    const marketData = await this.getMarketIndex();
    
    // Base category values (relative to market index)
    const categoryBaseValues = {
      'Laptops': marketData.indexValue * 0.15,
      'Phones': marketData.indexValue * 0.12,
      'Electronics': marketData.indexValue * 0.10,
      'Gaming': marketData.indexValue * 0.08,
      'Cameras': marketData.indexValue * 0.07,
      'Furniture': marketData.indexValue * 0.05,
      'Sports': marketData.indexValue * 0.04,
      'Clothing': marketData.indexValue * 0.03,
      'Books': marketData.indexValue * 0.02,
      'Other': marketData.indexValue * 0.03
    };

    // Condition multipliers
    const conditionMultipliers = {
      'excellent': 1.0,
      'good': 0.7,
      'fair': 0.5,
      'poor': 0.3
    };

    const baseValue = categoryBaseValues[category] || categoryBaseValues['Other'];
    const conditionMultiplier = conditionMultipliers[condition] || 0.5;
    
    const finalValue = Math.round(baseValue * conditionMultiplier);

    return {
      value: finalValue,
      marketIndex: marketData.indexValue,
      categoryBase: baseValue,
      conditionMultiplier: conditionMultiplier,
      calculationDate: new Date().toISOString(),
      isFallback: marketData.isFallback
    };
  }
};