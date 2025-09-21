import { useEffect, useState } from 'react';
import { TelegramWebApp, TelegramUser } from '../types/telegram';

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegram = () => {
  const [tg] = useState(() => window.Telegram?.WebApp || null);
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (tg) {
      tg.ready();
      tg.expand();

      // Apply Telegram theme
      const themeParams = tg.themeParams;
      if (themeParams) {
        const root = document.documentElement;
        if (themeParams.bg_color) root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
        if (themeParams.text_color) root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
        if (themeParams.hint_color) root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
        if (themeParams.link_color) root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
        if (themeParams.button_color) root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
        if (themeParams.button_text_color) root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
        if (themeParams.secondary_bg_color) root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color);
      }

      setUser(tg.initDataUnsafe?.user || null);
    }
  }, [tg]);

  const showBackButton = () => {
    tg?.BackButton.show();
  };

  const hideBackButton = () => {
    tg?.BackButton.hide();
  };

  const showMainButton = (text: string, onClick: () => void) => {
    if (tg) {
      tg.MainButton.setText(text);
      tg.MainButton.show();
      tg.MainButton.onClick(onClick);
    }
  };

  const hideMainButton = () => {
    tg?.MainButton.hide();
  };

  const close = () => {
    tg?.close();
  };

  const showAlert = (message: string, callback?: () => void) => {
    tg?.showAlert(message, callback);
  };

  const showConfirm = (message: string, callback?: (confirmed: boolean) => void) => {
    tg?.showConfirm(message, callback);
  };

  return {
    tg,
    user,
    showBackButton,
    hideBackButton,
    showMainButton,
    hideMainButton,
    close,
    showAlert,
    showConfirm,
    isReady: !!tg
  };
};