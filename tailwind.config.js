/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'telegram-bg': 'var(--tg-theme-bg-color)',
        'telegram-text': 'var(--tg-theme-text-color)',
        'telegram-hint': 'var(--tg-theme-hint-color)',
        'telegram-link': 'var(--tg-theme-link-color)',
        'telegram-button': 'var(--tg-theme-button-color)',
        'telegram-button-text': 'var(--tg-theme-button-text-color)',
        'telegram-secondary-bg': 'var(--tg-theme-secondary-bg-color)',
        'telegram-input-bg': 'var(--tg-theme-input-bg-color)',
        'telegram-input-text': 'var(--tg-theme-input-text-color)',
        'telegram-input-border': 'var(--tg-theme-input-border-color)',
        'telegram-input-focus': 'var(--tg-theme-input-focus-color)',
        'telegram-card-bg': 'var(--tg-theme-card-bg-color)',
        'telegram-border': 'var(--tg-theme-border-color)',
      },
      boxShadow: {
        'telegram': '0 4px 6px var(--tg-theme-shadow-color)',
        'telegram-lg': '0 8px 12px var(--tg-theme-shadow-color)',
        'telegram-xl': '0 10px 25px var(--tg-theme-shadow-color)',
      },
      spacing: {
        '14': '3.5rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [],
}