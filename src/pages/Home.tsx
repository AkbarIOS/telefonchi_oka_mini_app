import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const { language, t } = useLanguage();

  const menuItems = [
    {
      id: 'sell',
      title: t.sellButton,
      icon: '+',
      route: '/sell',
      description: t.sellDescription
    },
    {
      id: 'buy',
      title: t.buyButton,
      icon: '🔍',
      route: '/browse',
      description: t.buyDescription
    },
    {
      id: 'my_ads',
      title: t.myAds,
      icon: '☰',
      route: '/my-ads',
      description: t.myAdsDescription
    },
    {
      id: 'my_favorites',
      title: t.myFavorites,
      icon: '★',
      route: '/favorites',
      description: t.myFavoritesDescription
    },
    {
      id: 'settings',
      title: t.settings,
      icon: '⚙️',
      route: '/settings',
      description: t.settingsDescription
    }
  ];

  return (
    <div className="min-h-screen bg-telegram-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-telegram-text mb-2">
            {t.appName}
          </h1>
          <p className="text-telegram-hint">
            {t.appDescription}
          </p>
          {user && (
            <p className="text-telegram-text mt-2">
              {t.welcome}, {user.first_name}!
            </p>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow active:scale-95 transform transition-transform"
            >
              <div className="flex items-center space-x-4">
                <div className="text-4xl">{item.icon}</div>
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-telegram-text">
                    {item.title}
                  </h3>
                  <p className="text-sm text-telegram-hint">
                    {item.description}
                  </p>
                </div>
                <div className="text-telegram-hint">
                  →
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-4 max-w-md mx-auto">
          <h3 className="text-lg font-semibold text-telegram-text mb-3">
            {t.statistics}
          </h3>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-telegram-button">150+</div>
              <div className="text-sm text-telegram-hint">
                {t.activeAds}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-telegram-button">50+</div>
              <div className="text-sm text-telegram-hint">
                {t.happyCustomers}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 text-center">
          <p className="text-sm text-telegram-hint">
            {t.lastUpdate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;