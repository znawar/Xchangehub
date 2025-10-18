import ItemUpload from '../components/ItemUpload';
import { Link } from 'react-router-dom';

function Upload() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">xChangeHub</div>
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/marketplace" className="text-gray-700 hover:text-blue-600 font-medium">Marketplace</Link>
              <Link to="/upload" className="text-blue-600 font-medium">Sell Item</Link>
              <Link to="/chat" className="text-gray-700 hover:text-blue-600 font-medium">Chat</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8">
        <ItemUpload />
      </div>
    </div>
  );
}

export default Upload;