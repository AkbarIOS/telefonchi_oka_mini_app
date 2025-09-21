import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram';
import { LanguageProvider } from './contexts/LanguageContext';
import Home from './pages/Home';
import MyAds from './pages/MyAds';
import Browse from './pages/Browse';
import Sell from './pages/Sell';
import Favorites from './pages/Favorites';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const { isReady } = useTelegram();

  if (!isReady) {
    return (
      <LanguageProvider>
        <div className="flex justify-center items-center min-h-screen bg-telegram-bg">
          <div className="text-telegram-text">Loading...</div>
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <Router>
        <div className="App bg-telegram-bg min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-ads" element={<MyAds />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
