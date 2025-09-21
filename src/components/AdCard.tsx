import React from 'react';
import { Advertisement } from '../types/telegram';

interface AdCardProps {
  ad: Advertisement;
  isMyAd?: boolean;
  onSold?: (adId: number) => void;
  language?: string;
}

const AdCard: React.FC<AdCardProps> = ({
  ad,
  isMyAd = false,
  onSold,
  language = 'ru'
}) => {
  const formatPrice = (price: number | string): string => {
    try {
      const numPrice = typeof price === 'string' ? parseInt(price) : price;
      return numPrice.toLocaleString();
    } catch {
      return String(price || 'N/A');
    }
  };

  const getStatusText = (status: string): string => {
    const statusTexts: Record<string, Record<string, string>> = {
      'pending': { 'ru': 'На модерации', 'uz': 'Moderatsiyada' },
      'approved': { 'ru': 'Одобрено', 'uz': 'Tasdiqlangan' },
      'rejected': { 'ru': 'Отклонено', 'uz': 'Rad etilgan' },
      'sold': { 'ru': 'Продано', 'uz': 'Sotilgan' }
    };
    return statusTexts[status]?.[language] || status;
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'sold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleSoldClick = () => {
    if (onSold && ad.id) {
      onSold(ad.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="w-full h-48 bg-gray-200 overflow-hidden flex items-center justify-center">
        {ad.photo_path ? (
          <img
            src={ad.photo_path}
            alt={ad.model}
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onLoad={() => {
              console.log('✅ Image loaded successfully:', ad.photo_path);
              console.log('🌐 Current URL:', window.location.href);
              console.log('📱 User agent:', navigator.userAgent);
              console.log('🔒 Is secure context:', window.isSecureContext);
            }}
            onError={(e) => {
              console.error('❌ Image failed to load:', ad.photo_path);
              console.error('🌐 Current URL:', window.location.href);
              console.error('📱 User agent:', navigator.userAgent);
              console.error('🔒 Is secure context:', window.isSecureContext);
              console.error('Error event:', e);
              console.error('Network state:', navigator.onLine ? 'online' : 'offline');

              // Try to fetch the image directly to get more error info
              if (ad.photo_path) {
                fetch(ad.photo_path)
                  .then(response => {
                    console.error('❌ Fetch test result:', response.status, response.statusText);
                    console.error('❌ Response headers:', Array.from(response.headers.entries()));
                  })
                  .catch(fetchError => {
                    console.error('❌ Fetch test failed:', fetchError);
                  });
              }

              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI4MCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyODAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxyZWN0IHg9IjEwNSIgeT0iNzAiIHdpZHRoPSI3MCIgaGVpZ2h0PSI2MCIgcng9IjQiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iMTIwIiBjeT0iODUiIHI9IjgiIGZpbGw9IiNGM0Y0RjYiLz4KPC9zdmc+';
            }}
          />
        ) : (
          <div className="text-gray-400 text-center">
            <div className="text-4xl mb-2">□</div>
            <div className="text-sm">No Photo</div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-telegram-text line-clamp-1">
            {ad.brand_name} {ad.model}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ad.status)}`}>
            {getStatusText(ad.status)}
          </span>
        </div>

        <p className="text-2xl font-bold text-telegram-button mb-2">
          {formatPrice(ad.price)} сум
        </p>

        <p className="text-telegram-hint text-sm mb-2">
          Location: {ad.city}
        </p>

        <p className="text-telegram-text text-sm mb-3 line-clamp-2">
          {ad.description}
        </p>

        <div className="flex justify-between items-center text-sm text-telegram-hint mb-3">
          <span>Tel: {ad.contact_phone}</span>
          {ad.username && <span>@{ad.username}</span>}
        </div>

        <div className="text-xs text-telegram-hint mb-3">
          {new Date(ad.created_at).toLocaleDateString()}
          <span className="ml-2">• {ad.category_name}</span>
        </div>

        {isMyAd && ad.status === 'approved' && (
          <button
            onClick={handleSoldClick}
            className="w-full bg-telegram-button text-telegram-button-text py-2 px-4 rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            {language === 'ru' ? 'Продано' : 'Sotilgan'}
          </button>
        )}
      </div>
    </div>
  );
};

export default AdCard;