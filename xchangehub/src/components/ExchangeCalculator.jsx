import { useState, useEffect } from 'react';
import { stockService } from '../services/StockService';

function ExchangeCalculator({ category, condition, onExchangeValueUpdate }) {
  const [marketData, setMarketData] = useState(null);
  const [exchangeValue, setExchangeValue] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      calculateExchangeValue();
    }
  }, [category, condition]);

  const calculateExchangeValue = async () => {
    setLoading(true);
    try {
      const result = await stockService.calculateItemValue(category, condition);
      setExchangeValue(result.value);
      setMarketData(result);
      
      if (onExchangeValueUpdate) {
        onExchangeValueUpdate(result.value);
      }
    } catch (error) {
      console.error('Error calculating exchange value:', error);
      // Set a reasonable default
      const defaultValue = 100;
      setExchangeValue(defaultValue);
      if (onExchangeValueUpdate) {
        onExchangeValueUpdate(defaultValue);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-4">
      <h3 className="font-semibold text-green-800 mb-3">🔄 Exchange Value Calculator</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Category:</span>
          <span className="font-semibold capitalize">{category}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Condition:</span>
          <span className="font-semibold capitalize">{condition}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Exchange Value:</span>
          <div className="flex items-center gap-2">
            {loading ? (
              <span className="text-sm text-gray-500">Calculating...</span>
            ) : (
              <>
                <span className="font-semibold text-green-600">{exchangeValue} points</span>
                <button
                  onClick={calculateExchangeValue}
                  className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                >
                  ↻
                </button>
              </>
            )}
          </div>
        </div>

        {marketData && (
          <div className="text-xs text-gray-500">
            Based on current market conditions
            {marketData.isFallback && ' (using estimated values)'}
          </div>
        )}

        <p className="text-xs text-gray-600">
          💡 This value determines what items you can exchange for. Items with similar values can be traded 1:1.
        </p>
      </div>
    </div>
  );
}

export default ExchangeCalculator;