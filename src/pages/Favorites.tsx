import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';
import AdCard from '../components/AdCard';
import Pagination from '../components/Pagination';
import { Advertisement } from '../types/telegram';

const Favorites: React.FC = () => {
  const { user } = useTelegram();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [favorites, setFavorites] = useState<Advertisement[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockFavorites: Advertisement[] = [
      {
        id: 4,
        model: "iPhone 13",
        price: 13000000,
        description: "Perfect condition, 512GB, with original box",
        phone: "+998901234570",
        city: "Tashkent",
        contact_phone: "+998901234570",
        photo_path: "https://via.placeholder.com/300x200?text=iPhone+13",
        status: "approved",
        created_at: "2024-01-12T14:20:00Z",
        category_name: "Smartphones",
        brand_name: "Apple",
        username: "seller4"
      },
      {
        id: 5,
        model: "Samsung Galaxy A54",
        price: 6500000,
        description: "Excellent condition, 256GB storage, no issues",
        phone: "+998901234571",
        city: "Samarkand",
        contact_phone: "+998901234571",
        photo_path: "https://via.placeholder.com/300x200?text=Galaxy+A54",
        status: "approved",
        created_at: "2024-01-09T11:30:00Z",
        category_name: "Smartphones",
        brand_name: "Samsung",
        username: "seller5"
      }
    ];

    setTimeout(() => {
      setFavorites(mockFavorites);
      setLoading(false);
    }, 1000);
  }, []);

  const handleRemoveFromFavorites = (adId: number) => {
    setFavorites(prev => prev.filter(ad => ad.id !== adId));
    if (currentPage >= favorites.length - 1 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < favorites.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-telegram-bg">
        <div className="text-telegram-text">
          {t.loading}
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen bg-telegram-bg">
        <div className="container mx-auto px-4 py-6">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <button
              onClick={() => navigate('/')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
            >
              ← {t.back}
            </button>
            <h1 className="text-2xl font-bold text-telegram-text flex-1 text-center">
              {t.favorites}
            </h1>
            <div className="w-16"></div>
          </div>

          <div className="flex flex-col items-center justify-center min-h-96">
            <div className="text-6xl mb-4">❤️</div>
            <h2 className="text-xl font-semibold text-telegram-text mb-2">
              {t.noFavorites}
            </h2>
            <p className="text-telegram-hint text-center max-w-sm">
              {language === 'ru'
                ? 'Добавьте объявления в избранное, чтобы легко найти их позже'
                : 'E\'lonlarni sevimlilarga qo\'shing, keyinroq oson topish uchun'
              }
            </p>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-sm">
              <p className="text-sm text-blue-700 text-center">
                {language === 'ru'
                  ? '💡 Нажмите на ❤️ в любом объявлении, чтобы добавить его в избранное'
                  : '💡 Istalgan e\'londa ❤️ ni bosing, uni sevimlilarga qo\'shish uchun'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentAd = favorites[currentPage];

  return (
    <div className="min-h-screen bg-telegram-bg">
      <div className="container mx-auto px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors mr-3"
          >
            ← {t.back}
          </button>
          <h1 className="text-2xl font-bold text-telegram-text flex-1 text-center">
            {t.favorites}
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Favorites count */}
        <div className="mb-4 text-center text-telegram-hint">
          {language === 'ru'
            ? `У вас ${favorites.length} избранных объявлений`
            : `Sizda ${favorites.length} ta saralangan e\'lon bor`}
        </div>

        {currentAd && (
          <div className="max-w-md mx-auto">
            <AdCard
              ad={currentAd}
              isMyAd={false}
            />

            {/* Remove from favorites button */}
            <div className="mt-4">
              <button
                onClick={() => handleRemoveFromFavorites(currentAd.id)}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
              >
                <span>💔</span>
                <span>
                  {t.removeFromFavorites}
                </span>
              </button>
            </div>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={favorites.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />

        {/* Tips */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              {language === 'ru' ? '💡 Полезные советы:' : '💡 Foydali maslahatlar:'}
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>
                {language === 'ru'
                  ? '• Регулярно проверяйте избранные объявления'
                  : '• Saralangan e\'lonlarni muntazam tekshiring'
                }
              </li>
              <li>
                {language === 'ru'
                  ? '• Связывайтесь с продавцами быстро'
                  : '• Sotuvchilar bilan tez bog\'laning'
                }
              </li>
              <li>
                {language === 'ru'
                  ? '• Сравнивайте цены похожих товаров'
                  : '• O\'xshash mahsulotlar narxlarini solishtiring'
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;