import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  language?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  language = 'ru'
}) => {
  const texts = {
    ru: {
      previous: '← Назад',
      next: 'Далее →',
      page: 'страница'
    },
    uz: {
      previous: '← Orqaga',
      next: 'Keyingi →',
      page: 'sahifa'
    }
  };

  const t = texts[language as keyof typeof texts] || texts.ru;

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-between items-center p-4 bg-telegram-secondary-bg">
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-md font-medium transition-opacity ${
          currentPage === 0
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-telegram-button text-telegram-button-text hover:opacity-90'
        }`}
      >
        {t.previous}
      </button>

      <div className="flex items-center space-x-2 text-telegram-text">
        <span className="text-sm">
          {t.page} {currentPage + 1} / {totalPages}
        </span>
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={`px-4 py-2 rounded-md font-medium transition-opacity ${
          currentPage === totalPages - 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-telegram-button text-telegram-button-text hover:opacity-90'
        }`}
      >
        {t.next}
      </button>
    </div>
  );
};

export default Pagination;