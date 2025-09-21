import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { showAlert } = useTelegram();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (newLanguage: 'ru' | 'uz') => {
    setLanguage(newLanguage);

    showAlert?.(
      newLanguage === 'ru' ? t.languageChanged : 'Til o\'zbekchaga o\'zgartirildi',
      () => {}
    );
  };


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
            {t.settingsTitle}
          </h1>
          <div className="w-16"></div>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Language Settings */}
          <div className="card-enhanced p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-telegram-text mb-4 flex items-center">
              <span className="text-2xl mr-3">🌐</span>
              {t.language}
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => handleLanguageChange('ru')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  language === 'ru'
                    ? 'bg-telegram-button text-white shadow-telegram-lg'
                    : 'bg-telegram-secondary-bg text-telegram-text hover:bg-telegram-button hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🇷🇺</span>
                    <span className="font-medium">{t.russian}</span>
                  </div>
                  {language === 'ru' && (
                    <span className="text-xl text-white">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => handleLanguageChange('uz')}
                className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                  language === 'uz'
                    ? 'bg-telegram-button text-white shadow-telegram-lg'
                    : 'bg-telegram-secondary-bg text-telegram-text hover:bg-telegram-button hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">🇺🇿</span>
                    <span className="font-medium">{t.uzbek}</span>
                  </div>
                  {language === 'uz' && (
                    <span className="text-xl text-white">✓</span>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="card-enhanced p-6 rounded-2xl">
            <h2 className="text-lg font-semibold text-telegram-text mb-4 flex items-center">
              <span className="text-2xl mr-3">ℹ️</span>
              {t.about}
            </h2>

            <div className="space-y-3">
              <div className="text-telegram-hint">
                {t.appDescriptionLong}
              </div>
              <div className="text-telegram-hint text-sm">
                {t.version}
              </div>
            </div>
          </div>

          {/* Navigation hint */}
          <div className="text-center text-telegram-hint text-sm">
            💡 {t.changesApplyAfterReload}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;