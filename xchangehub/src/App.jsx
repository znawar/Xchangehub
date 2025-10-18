import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Marketplace from './pages/Marketplace'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Upload from './pages/Upload';
import Exchange from './pages/Exchange';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/exchange" element={<Exchange />} />
      </Routes>
    </Router>
  )
}

export default App