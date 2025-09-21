export interface Translations {
  // Common
  back: string;
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  yes: string;
  no: string;
  save: string;
  done: string;

  // App Name & Description
  appName: string;
  appDescription: string;
  welcome: string;

  // Home Page
  sellButton: string;
  buyButton: string;
  myAds: string;
  myFavorites: string;
  settings: string;
  sellDescription: string;
  buyDescription: string;
  myAdsDescription: string;
  myFavoritesDescription: string;
  settingsDescription: string;
  statistics: string;
  activeAds: string;
  happyCustomers: string;
  lastUpdate: string;

  // Sell Page
  createAd: string;
  category: string;
  selectCategory: string;
  brand: string;
  selectBrand: string;
  model: string;
  modelPlaceholder: string;
  price: string;
  pricePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  city: string;
  selectCity: string;
  phone: string;
  phonePlaceholder: string;
  photo: string;
  photoSelected: string;
  creating: string;
  createSuccess: string;
  createError: string;
  userError: string;
  allFieldsRequired: string;
  photoRequired: string;
  moderationTime: string;

  // My Ads Page
  myAdvertisements: string;
  loadingAds: string;
  noAds: string;
  allAds: string;
  pending: string;
  approved: string;
  rejected: string;
  sold: string;
  showing: string;
  of: string;
  previous: string;
  next: string;
  markAsSold: string;
  markAsSoldConfirm: string;
  markedAsSold: string;
  markAsSoldError: string;
  noAdsWithStatus: string;

  // Browse Page
  browseAds: string;
  searchAds: string;
  filterBy: string;
  sortBy: string;
  newest: string;
  oldest: string;
  priceHighToLow: string;
  priceLowToHigh: string;
  noResults: string;
  searchPlaceholder: string;

  // Favorites Page
  favorites: string;
  noFavorites: string;
  addToFavorites: string;
  removeFromFavorites: string;

  // Settings Page
  settingsTitle: string;
  language: string;
  russian: string;
  uzbek: string;
  about: string;
  version: string;
  appDescriptionLong: string;
  languageChanged: string;
  changesApplyAfterReload: string;

  // Ad Card
  viewDetails: string;
  contactSeller: string;
  addFavorite: string;
  removeFavorite: string;

  // Error Messages
  networkError: string;
  unknownError: string;
  loadingError: string;
  validationError: string;

  // Status Messages
  statusPending: string;
  statusApproved: string;
  statusRejected: string;
  statusSold: string;

  // Form Validation
  required: string;
  invalidPhone: string;
  invalidPrice: string;
  minPrice: string;
  maxPrice: string;
}

export const translations: Record<'ru' | 'uz', Translations> = {
  ru: {
    // Common
    back: 'Назад',
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    yes: 'Да',
    no: 'Нет',
    save: 'Сохранить',
    done: 'Готово',

    // App Name & Description
    appName: 'Telefonchi',
    appDescription: 'Покупай и продавай телефоны легко!',
    welcome: 'Добро пожаловать',

    // Home Page
    sellButton: 'Продать',
    buyButton: 'Купить',
    myAds: 'Мои объявления',
    myFavorites: 'Избранное',
    settings: 'Настройки',
    sellDescription: 'Разместить объявление',
    buyDescription: 'Просмотр объявлений',
    myAdsDescription: 'Управление объявлениями',
    myFavoritesDescription: 'Сохраненные объявления',
    settingsDescription: 'Настройки приложения',
    statistics: 'Статистика',
    activeAds: 'Активных объявлений',
    happyCustomers: 'Довольных покупателей',
    lastUpdate: 'Последнее обновление: сегодня в 10:30',

    // Sell Page
    createAd: 'Создать объявление',
    category: 'Категория',
    selectCategory: 'Выберите категорию',
    brand: 'Бренд',
    selectBrand: 'Выберите бренд',
    model: 'Модель',
    modelPlaceholder: 'Например: iPhone 14 Pro',
    price: 'Цена (сум)',
    pricePlaceholder: '15000000',
    description: 'Описание',
    descriptionPlaceholder: 'Опишите состояние устройства...',
    city: 'Город',
    selectCity: 'Выберите город',
    phone: 'Телефон',
    phonePlaceholder: '+998901234567',
    photo: 'Фото',
    photoSelected: 'Выбрано: ',
    creating: 'Создание...',
    createSuccess: 'Объявление успешно создано и отправлено на модерацию!',
    createError: 'Ошибка при создании объявления',
    userError: 'Ошибка: не удалось определить пользователя',
    allFieldsRequired: 'Все поля обязательны для заполнения',
    photoRequired: 'Фото товара обязательно для размещения',
    moderationTime: 'Модерация занимает до 24 часов',

    // My Ads Page
    myAdvertisements: 'Мои объявления',
    loadingAds: 'Загрузка объявлений...',
    noAds: 'У вас пока нет объявлений',
    allAds: 'Все объявления',
    pending: 'На модерации',
    approved: 'Одобренные',
    rejected: 'Отклоненные',
    sold: 'Проданные',
    showing: 'Показано',
    of: 'из',
    previous: 'Назад',
    next: 'Вперед',
    markAsSold: 'Отметить как проданное',
    markAsSoldConfirm: 'Вы уверены, что хотите отметить объявление как проданное?',
    markedAsSold: 'Объявление отмечено как проданное',
    markAsSoldError: 'Ошибка при обновлении статуса объявления',
    noAdsWithStatus: 'Нет объявлений со статусом',

    // Browse Page
    browseAds: 'Просмотр объявлений',
    searchAds: 'Поиск объявлений',
    filterBy: 'Фильтр по',
    sortBy: 'Сортировка',
    newest: 'Новые',
    oldest: 'Старые',
    priceHighToLow: 'Цена: по убыванию',
    priceLowToHigh: 'Цена: по возрастанию',
    noResults: 'Результатов не найдено',
    searchPlaceholder: 'Поиск по названию...',

    // Favorites Page
    favorites: 'Избранное',
    noFavorites: 'У вас нет избранных объявлений',
    addToFavorites: 'Добавить в избранное',
    removeFromFavorites: 'Удалить из избранного',

    // Settings Page
    settingsTitle: 'Настройки',
    language: 'Язык',
    russian: 'Русский',
    uzbek: 'Узбекский',
    about: 'О приложении',
    version: 'Версия 1.0.0',
    appDescriptionLong: 'Telegram мини-приложение для покупки и продажи техники',
    languageChanged: 'Язык изменен на русский',
    changesApplyAfterReload: 'Изменения вступят в силу после перезапуска страницы',

    // Ad Card
    viewDetails: 'Подробнее',
    contactSeller: 'Связаться с продавцом',
    addFavorite: 'В избранное',
    removeFavorite: 'Удалить из избранного',

    // Error Messages
    networkError: 'Ошибка сети',
    unknownError: 'Неизвестная ошибка',
    loadingError: 'Ошибка загрузки',
    validationError: 'Ошибка валидации',

    // Status Messages
    statusPending: 'На модерации',
    statusApproved: 'Одобрено',
    statusRejected: 'Отклонено',
    statusSold: 'Продано',

    // Form Validation
    required: 'Обязательное поле',
    invalidPhone: 'Неверный номер телефона',
    invalidPrice: 'Неверная цена',
    minPrice: 'Минимальная цена: 1000 сум',
    maxPrice: 'Максимальная цена: 1000000000 сум',
  },

  uz: {
    // Common
    back: 'Orqaga',
    loading: 'Yuklanmoqda...',
    error: 'Xatolik',
    success: 'Muvaffaqiyatli',
    cancel: 'Bekor qilish',
    confirm: 'Tasdiqlash',
    yes: 'Ha',
    no: 'Yo\'q',
    save: 'Saqlash',
    done: 'Tayyor',

    // App Name & Description
    appName: 'Telefonchi',
    appDescription: 'Telefonlarni oson sotib oling va soting!',
    welcome: 'Xush kelibsiz',

    // Home Page
    sellButton: 'Sotish',
    buyButton: 'Sotib olish',
    myAds: 'Mening e\'lonlarim',
    myFavorites: 'Saralangan',
    settings: 'Sozlamalar',
    sellDescription: 'E\'lon joylashtirish',
    buyDescription: 'E\'lonlarni ko\'rish',
    myAdsDescription: 'E\'lonlarni boshqarish',
    myFavoritesDescription: 'Saqlangan e\'lonlar',
    settingsDescription: 'Ilova sozlamalari',
    statistics: 'Statistika',
    activeAds: 'Faol e\'lonlar',
    happyCustomers: 'Mamnun xaridorlar',
    lastUpdate: 'Oxirgi yangilanish: bugun 10:30',

    // Sell Page
    createAd: 'E\'lon yaratish',
    category: 'Kategoriya',
    selectCategory: 'Kategoriyani tanlang',
    brand: 'Brend',
    selectBrand: 'Brendni tanlang',
    model: 'Model',
    modelPlaceholder: 'Masalan: iPhone 14 Pro',
    price: 'Narx (so\'m)',
    pricePlaceholder: '15000000',
    description: 'Tavsif',
    descriptionPlaceholder: 'Qurilma holatini tasvirlab bering...',
    city: 'Shahar',
    selectCity: 'Shaharni tanlang',
    phone: 'Telefon',
    phonePlaceholder: '+998901234567',
    photo: 'Rasm',
    photoSelected: 'Tanlangan: ',
    creating: 'Yaratilmoqda...',
    createSuccess: 'E\'lon muvaffaqiyatli yaratildi va moderatsiyaga yuborildi!',
    createError: 'E\'lon yaratishda xatolik',
    userError: 'Xatolik: foydalanuvchi aniqlanmadi',
    allFieldsRequired: 'Barcha maydonlar to\'ldirilishi shart',
    photoRequired: 'Mahsulot rasmi majburiy',
    moderationTime: 'Moderatsiya 24 soatgacha davom etadi',

    // My Ads Page
    myAdvertisements: 'Mening e\'lonlarim',
    loadingAds: 'E\'lonlar yuklanmoqda...',
    noAds: 'Sizda hali elon yo\'q',
    allAds: 'Barcha e\'lonlar',
    pending: 'Moderatsiyada',
    approved: 'Tasdiqlangan',
    rejected: 'Rad etilgan',
    sold: 'Sotilgan',
    showing: 'Ko\'rsatilmoqda',
    of: 'dan',
    previous: 'Orqaga',
    next: 'Oldinga',
    markAsSold: 'Sotilgan deb belgilash',
    markAsSoldConfirm: 'Siz eloningizni sotilgan deb belgilashga ishonchingiz komilmi?',
    markedAsSold: 'Elon sotilgan deb belgilandi',
    markAsSoldError: 'E\'lon statusini yangilashda xatolik',
    noAdsWithStatus: 'statusdagi e\'lonlar yo\'q',

    // Browse Page
    browseAds: 'E\'lonlarni ko\'rish',
    searchAds: 'E\'lonlarni qidirish',
    filterBy: 'Filter bo\'yicha',
    sortBy: 'Saralash',
    newest: 'Yangi',
    oldest: 'Eski',
    priceHighToLow: 'Narx: kamayib borish',
    priceLowToHigh: 'Narx: o\'sib borish',
    noResults: 'Natija topilmadi',
    searchPlaceholder: 'Nom bo\'yicha qidirish...',

    // Favorites Page
    favorites: 'Saralangan',
    noFavorites: 'Sizda saralangan e\'lonlar yo\'q',
    addToFavorites: 'Saralamalarga qo\'shish',
    removeFromFavorites: 'Saralamalardan o\'chirish',

    // Settings Page
    settingsTitle: 'Sozlamalar',
    language: 'Til',
    russian: 'Rus tili',
    uzbek: 'O\'zbek tili',
    about: 'Ilova haqida',
    version: 'Versiya 1.0.0',
    appDescriptionLong: 'Texnika sotib olish va sotish uchun Telegram mini ilovasi',
    languageChanged: 'Til o\'zbekchaga o\'zgartirildi',
    changesApplyAfterReload: 'O\'zgarishlar sahifani qayta yuklashdan keyin kuchga kiradi',

    // Ad Card
    viewDetails: 'Batafsil',
    contactSeller: 'Sotuvchi bilan bog\'lanish',
    addFavorite: 'Saralamalarga',
    removeFavorite: 'Saralamalardan o\'chirish',

    // Error Messages
    networkError: 'Tarmoq xatosi',
    unknownError: 'Noma\'lum xatolik',
    loadingError: 'Yuklash xatosi',
    validationError: 'Tekshirish xatosi',

    // Status Messages
    statusPending: 'Moderatsiyada',
    statusApproved: 'Tasdiqlangan',
    statusRejected: 'Rad etilgan',
    statusSold: 'Sotilgan',

    // Form Validation
    required: 'Majburiy maydon',
    invalidPhone: 'Noto\'g\'ri telefon raqami',
    invalidPrice: 'Noto\'g\'ri narx',
    minPrice: 'Minimal narx: 1000 so\'m',
    maxPrice: 'Maksimal narx: 1000000000 so\'m',
  },
};