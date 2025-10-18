import { Link } from 'react-router-dom';
function Chat() {
  const conversations = [
    { id: 1, name: "John Doe", lastMessage: "Is the textbook still available?", unread: true },
    { id: 2, name: "Sarah Smith", lastMessage: "Thanks for the laptop!", unread: false },
    { id: 3, name: "Mike Johnson", lastMessage: "Can we meet tomorrow?", unread: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-blue-600">xChangeHub</div>
            <div className="flex space-x-4">
              <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
              <a href="/marketplace" className="text-gray-700 hover:text-blue-600 font-medium">Marketplace</a>
              <a href="/chat" className="text-blue-600 font-medium">Chat</a>
              <a href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</a>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="bg-white rounded-lg shadow-sm">
          {/* Conversations List */}
          <div className="border-b">
            {conversations.map(conv => (
              <div key={conv.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{conv.name}</h3>
                    <p className="text-gray-600 text-sm">{conv.lastMessage}</p>
                  </div>
                  {conv.unread && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Area */}
          <div className="p-8 text-center text-gray-500">
            <div className="text-6xl mb-4">💬</div>
            <p>Select a conversation to start chatting</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;