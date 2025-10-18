import { Link } from 'react-router-dom';
function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">xChangeHub</div>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="/marketplace" className="text-gray-700 hover:text-blue-600 font-medium">Marketplace</a>
              <a href="/chat" className="text-gray-700 hover:text-blue-600 font-medium">Chat</a>
              <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-5xl font-bold mb-6">Welcome to xChangeHub</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            A unified platform to exchange, buy, or sell items.
          </p>
          <a href="/marketplace" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition duration-200 inline-block">
            Explore Marketplace
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold">🔄</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Item Exchange</h3>
              <p className="text-gray-600">Swap books, gadgets, and more with fellow students</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Market Insights</h3>
              <p className="text-gray-600">Track trends and make informed decisions</p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 font-bold">💬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Live Chat</h3>
              <p className="text-gray-600">Connect instantly with buyers and sellers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 flex-shrink-0 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <p>&copy; 2024 xChangeHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;