import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function Marketplace() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['all', 'Electronics', 'Books', 'Clothing', 'Furniture', 'Sports', 'Other'];

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchTerm, selectedCategory, sortBy]);

  const fetchItems = async () => {
    try {
      const q = query(collection(db, 'items'), where('status', '==', 'available'));
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

  const filterItems = () => {
    let filtered = items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'exchange-value':
          return b.exchangeValue - a.exchangeValue;
        case 'newest':
        default:
          return b.createdAt - a.createdAt;
      }
    });

    setFilteredItems(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">xChangeHub</div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/marketplace" className="text-blue-600 font-medium">Marketplace</Link>
              <Link to="/upload" className="text-gray-700 hover:text-blue-600 font-medium">Sell Item</Link>
              <Link to="/chat" className="text-gray-700 hover:text-blue-600 font-medium">Chat</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <Link 
            to="/upload" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            + Sell Item
          </Link>
        </div>
        
        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="exchange-value">Highest Exchange Value</option>
            </select>

            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('newest');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map(item => (
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
                
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="capitalize">{item.condition}</span>
                  <span>{item.category}</span>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button className="flex-1 bg-blue-500 text-white py-2 rounded text-sm hover:bg-blue-600 transition duration-200">
                    Buy
                  </button>
                  <button className="flex-1 bg-green-500 text-white py-2 rounded text-sm hover:bg-green-600 transition duration-200">
                    Exchange
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg">No items found. Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Marketplace;