import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import ExchangeCalculator from './ExchangeCalculator';

function ItemUpload() {
  const [listingType, setListingType] = useState('sell'); 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: 'excellent',
    image: '',
    exchangeValue: 0
  });

  const categories = ['Electronics', 'Phones', 'Laptops', 'Books', 'Clothing', 'Furniture', 'Sports', 'Gaming', 'Cameras', 'Other'];

  const handleExchangeValueUpdate = (points) => {
    setFormData(prev => ({
      ...prev,
      exchangeValue: points
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        condition: formData.condition,
        image: formData.image,
        listingType: listingType,
        status: 'available',
        sellerId: 'user-id-here', // From auth later
        createdAt: serverTimestamp(),
        lastMarketUpdate: new Date().toISOString()
      };

      // Add type-specific data
      if (listingType === 'sell') {
        itemData.price = parseFloat(formData.price);
        itemData.exchangeValue = 0; // Not available for exchange
      } else { // exchange
        itemData.price = 0; // Not for sale
        itemData.exchangeValue = parseFloat(formData.exchangeValue);
      }

      await addDoc(collection(db, 'items'), itemData);
      alert(`Item listed for ${listingType === 'sell' ? 'sale' : 'exchange'} successfully!`);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        condition: 'excellent',
        image: '',
        exchangeValue: 0
      });
    } catch (error) {
      console.error('Error adding item: ', error);
      alert('Error listing item');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6">List Your Item</h2>
      
      {/* Listing Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => setListingType('sell')}
          className={`flex-1 py-3 px-4 rounded-md transition duration-200 font-semibold ${
            listingType === 'sell' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
          }`}
        >
          💰 Sell for Money
        </button>
        <button
          type="button"
          onClick={() => setListingType('exchange')}
          className={`flex-1 py-3 px-4 rounded-md transition duration-200 font-semibold ${
            listingType === 'exchange' ? 'bg-white shadow-sm text-green-600' : 'text-gray-600'
          }`}
        >
          🔄 Exchange for Items
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Item Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., iPhone 15 Pro Max"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your item..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="excellent">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Conditional Fields Based on Listing Type */}
        {listingType === 'sell' ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your price"
              step="0.01"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Set the price you want to sell for</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Value</label>
            <input
              type="number"
              name="exchangeValue"
              value={formData.exchangeValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Auto-calculated"
              step="0.01"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">Automatically calculated based on market value</p>
            
            {/* Exchange Calculator */}
            {formData.category && (
              <ExchangeCalculator 
                category={formData.category}
                condition={formData.condition}
                onExchangeValueUpdate={handleExchangeValueUpdate}
              />
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          {listingType === 'sell' ? 'List for Sale' : 'List for Exchange'}
        </button>
      </form>
    </div>
  );
}

export default ItemUpload;