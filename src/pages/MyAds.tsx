import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';
import AdCard from '../components/AdCard';
import { Advertisement } from '../types/telegram';
import { apiService } from '../services/api';

const MyAds: React.FC = () => {
  const { user, showAlert, showConfirm } = useTelegram();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [error, setError] = useState<string | null>(null);

  const ADS_PER_PAGE = 10;

  useEffect(() => {
    const loadUserAds = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const userAds = await apiService.getUserAdvertisements(user.id);
        setAds(userAds);
      } catch (error) {
        console.error('Error loading user ads:', error);
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
            photo_path: "https://via.placeholder.com/280x200?text=iPhone+14+Pro",
            status: "approved",
            created_at: "2024-01-15T10:30:00Z",
            category_name: "Smartphones",
            brand_name: "Apple",
            username: user?.username || "user"
          }
        ];
        setAds(mockAds);
      } finally {
        setLoading(false);
      }
    };

    loadUserAds();
  }, [user, language]);

  const handleSoldClick = async (adId: number) => {
    showConfirm?.(
      t.markAsSoldConfirm,
      async (confirmed) => {
        if (confirmed) {
          try {
            await apiService.markAdvertisementSold(adId);

            setAds(prevAds =>
              prevAds.map(ad =>
                ad.id === adId ? { ...ad, status: 'sold' as const } : ad
              )
            );

            showAlert?.(
              t.markedAsSold,
              () => {}
            );
          } catch (error) {
            showAlert?.(
              t.markAsSoldError,
              () => {}
            );
          }
        }
      }
    );
  };

  // Filter ads by status
  const filteredAds = ads.filter(ad => {
    if (selectedStatus === 'all') return true;
    return ad.status === selectedStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredAds.length / ADS_PER_PAGE);
  const startIndex = (currentPage - 1) * ADS_PER_PAGE;
  const endIndex = startIndex + ADS_PER_PAGE;
  const currentAds = filteredAds.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  if (loading) {
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
              {t.myAdvertisements}
            </h1>
            <div className="w-16"></div>
          </div>

          {/* Loading content */}
          <div className="flex justify-center items-center min-h-96">
            <div className="flex flex-col items-center space-y-4">
              <div className="loading-spinner w-8 h-8 border-4 border-telegram-button border-t-transparent rounded-full animate-spin"></div>
              <div className="text-telegram-text">
                {t.loadingAds}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (ads.length === 0) {
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
              {t.myAdvertisements}
            </h1>
            <div className="w-16"></div>
          </div>

          <div className="flex justify-center items-center min-h-96">
            <div className="text-center">
              <div className="text-6xl mb-4">📝</div>
              <div className="text-telegram-hint">
                {t.noAds}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            {t.myAdvertisements}
          </h1>
          <div className="w-16"></div>
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <select
            value={selectedStatus}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
          >
            <option value="all">{t.allAds}</option>
            <option value="pending">{t.pending}</option>
            <option value="approved">{t.approved}</option>
            <option value="rejected">{t.rejected}</option>
            <option value="sold">{t.sold}</option>
          </select>
        </div>

        {filteredAds.length === 0 ? (
          <div className="flex justify-center items-center min-h-64">
            <div className="text-telegram-hint text-center">
              {t.noAdsWithStatus} "{selectedStatus}"
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="mb-6 text-center">
              <div className="text-telegram-hint text-sm">
                {t.showing} {currentAds.length} {t.of} {filteredAds.length}
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid-ads fade-in">
              {currentAds.map(ad => (
                <div key={ad.id} className="card-enhanced rounded-xl overflow-hidden hover:shadow-telegram-lg transition-all duration-200">
                  <AdCard
                    ad={ad}
                    isMyAd={true}
                    onSold={handleSoldClick}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center items-center space-x-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === 1
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-telegram-button text-telegram-button-text hover:opacity-80'
                  }`}
                >
                  ⬅️ {t.previous}
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                        page === currentPage
                          ? 'bg-telegram-button text-telegram-button-text'
                          : 'bg-telegram-secondary-bg text-telegram-text hover:bg-telegram-button hover:text-telegram-button-text'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === totalPages
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-telegram-button text-telegram-button-text hover:opacity-80'
                  }`}
                >
                  {t.next} ➡️
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyAds;