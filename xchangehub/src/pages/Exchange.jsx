import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { stockService } from '../services/StockService';

function Exchange() {
  const [items, setItems] = useState([]);
  const [marketData, setMarketData] = useState(null);
  const [userPoints, setUserPoints] = useState(1000); // Mock user points

  useEffect(() => {
    fetchItems();
    fetchMarketData();
  }, []);

  const fetchItems = async () => {
    try {
      const q = query(
        collection(db, 'items'), 
        where('status', '==', 'available')
      );
      const querySnapshot = await getDocs(q);
      const itemsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(itemsData);
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
  };

  const fetchMarketData = async () => {
    const data = await stockService.getMarketIndex();
    setMarketData(data);
  };

  const handleExchange = async (item) => {
    if (userPoints >= item.exchangeValue) {
      if (window.confirm(`Exchange ${item.exchangeValue} points for ${item.title}?`)) {
        // Here you would update Firestore to mark item as exchanged
        // and update user points
        alert(`Successfully exchanged for ${item.title}!`);
        setUserPoints(prev => prev - item.exchangeValue);
      }
    } else {
      alert('Not enough points for this exchange!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">xChangeHub</div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-blue-600 font-medium">Marketplace</Link>
              <Link to="/exchange" className="text-blue-600 font-medium">Exchange</Link>
              <Link to="/upload" className="text-gray-700 hover:text-blue-600 font-medium">Sell Item</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Market Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Stock-Based Exchange</h1>
              <p className="text-gray-600">Trade items using market-based points</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{userPoints} points</div>
              <div className="text-sm text-gray-500">Your Balance</div>
            </div>
          </div>

          {marketData && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Market Index: {marketData.indexValue.toFixed(2)}</span>
                <button 
                  onClick={fetchMarketData}
                  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Refresh
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Exchange Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200">
              <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover rounded-t-lg" />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 truncate">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                
                <div className="flex justify-between items-center mb-2">
                  <span className="text-blue-600 font-bold">${item.price}</span>
                  <span className="text-green-600 font-medium">{item.exchangeValue} points</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="capitalize">{item.condition}</span>
                  <span>{item.category}</span>
                </div>
                
                <button 
                  onClick={() => handleExchange(item)}
                  disabled={userPoints < item.exchangeValue}
                  className={`w-full py-2 rounded text-sm font-semibold transition duration-200 ${
                    userPoints >= item.exchangeValue
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {userPoints >= item.exchangeValue ? 'Exchange Now' : 'Insufficient Points'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Exchange;