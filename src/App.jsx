import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Scan from './pages/Scan';
import Venue from './pages/Venue';
import Chat from './pages/Chat';
import Admin from './pages/Admin';
import MobileFrame from './components/MobileFrame';

function App() {
  return (
    <BrowserRouter>
      <MobileFrame>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/venue/:id" element={<Venue />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </MobileFrame>
    </BrowserRouter>
  );
}

export default App;
