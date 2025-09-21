import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';
import AdCard from '../components/AdCard';
import Pagination from '../components/Pagination';
import { Advertisement } from '../types/telegram';
import { apiService } from '../services/api';

const Browse: React.FC = () => {
  const { user, showAlert } = useTelegram();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAdvertisements = async () => {
      try {
        setError(null);
        const response = await apiService.getAdvertisements({ status: 'approved' });
        setAds(response.advertisements);
      } catch (error) {
        console.error('Error loading advertisements:', error);
        setError(t.loadingError);

        // Fallback to mock data if API fails
        const mockAds: Advertisement[] = [
          {
            id: 1,
            model: "iPhone 14 Pro",
            price: 15000000,
            description: "Excellent condition, 256GB storage, no scratches",
            phone: "+998901234567",
            city: "Tashkent",
            contact_phone: "+998901234567",
            photo_path: "https://via.placeholder.com/300x200?text=iPhone+14+Pro",
            status: "approved",
            created_at: "2024-01-15T10:30:00Z",
            category_name: "Smartphones",
            brand_name: "Apple",
            username: "seller1"
          },
          {
            id: 2,
            model: "Samsung Galaxy S23",
            price: 12000000,
            description: "Brand new, unopened box with warranty",
            phone: "+998901234568",
            city: "Samarkand",
            contact_phone: "+998901234568",
            photo_path: "https://via.placeholder.com/300x200?text=Galaxy+S23",
            status: "approved",
            created_at: "2024-01-10T15:45:00Z",
            category_name: "Smartphones",
            brand_name: "Samsung",
            username: "seller2"
          },
          {
            id: 3,
            model: "Xiaomi Redmi Note 12",
            price: 4500000,
            description: "Good condition, 128GB, minor scratches",
            phone: "+998901234569",
            city: "Bukhara",
            contact_phone: "+998901234569",
            photo_path: "https://via.placeholder.com/300x200?text=Redmi+Note+12",
            status: "approved",
            created_at: "2024-01-08T12:20:00Z",
            category_name: "Smartphones",
            brand_name: "Xiaomi",
            username: "seller3"
          }
        ];
        setAds(mockAds);
      } finally {
        setLoading(false);
      }
    };

    loadAdvertisements();
  }, [language]);

  const filteredAds = ads.filter(ad => {
    const matchesSearch = ad.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ad.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ad.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < filteredAds.length - 1) {
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

  if (filteredAds.length === 0) {
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
              {t.searchAds}
            </h1>
            <div className="w-16"></div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
            />
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
            >
              <option value="all">{language === 'ru' ? 'Все категории' : 'Barcha kategoriyalar'}</option>
              <option value="Smartphones">{language === 'ru' ? 'Смартфоны' : 'Smartfonlar'}</option>
              <option value="Tablets">{language === 'ru' ? 'Планшеты' : 'Planshetlar'}</option>
            </select>
          </div>

          <div className="flex justify-center items-center min-h-64">
            <div className="text-telegram-hint text-center">
              {t.noResults}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentAd = filteredAds[currentPage];

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
            {t.searchAds}
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-telegram-button"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-telegram-button"
          >
            <option value="all">{language === 'ru' ? 'Все категории' : 'Barcha kategoriyalar'}</option>
            <option value="Smartphones">{language === 'ru' ? 'Смартфоны' : 'Smartfonlar'}</option>
            <option value="Tablets">{language === 'ru' ? 'Планшеты' : 'Planshetlar'}</option>
            <option value="Accessories">{language === 'ru' ? 'Аксессуары' : 'Aksessuarlar'}</option>
          </select>
        </div>

        {/* Results count */}
        <div className="mb-4 text-center text-telegram-hint">
          {language === 'ru'
            ? `Найдено: ${filteredAds.length} объявлений`
            : `Topildi: ${filteredAds.length} ta e'lon`}
        </div>

        {currentAd && (
          <div className="max-w-md mx-auto">
            <AdCard
              ad={currentAd}
              isMyAd={false}
            />
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={filteredAds.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Browse;