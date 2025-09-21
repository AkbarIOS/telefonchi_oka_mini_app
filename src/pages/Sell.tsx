import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTelegram } from '../hooks/useTelegram';
import { useLanguage } from '../contexts/LanguageContext';
import { apiService } from '../services/api';

const Sell: React.FC = () => {
  const { user, showAlert } = useTelegram();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    model: '',
    price: '',
    description: '',
    city: '',
    phone: ''
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Array<{ id: number; name_ru: string; name_uz: string }>>([]);
  const [brands, setBrands] = useState<Array<{ id: number; name: string }>>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const cities = [
    'Tashkent', 'Samarkand', 'Bukhara', 'Andijan', 'Namangan',
    'Fergana', 'Nukus', 'Urgench', 'Termez', 'Qarshi'
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([
          apiService.getCategories(),
          apiService.getBrands()
        ]);

        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (error) {
        console.error('Error loading categories and brands:', error);
        // Fallback to static data
        setCategories([
          { id: 1, name_ru: 'Смартфоны', name_uz: 'Smartfonlar' },
          { id: 2, name_ru: 'Планшеты', name_uz: 'Planshetlar' }
        ]);
        setBrands([
          { id: 1, name: 'Apple' },
          { id: 2, name: 'Samsung' },
          { id: 3, name: 'Xiaomi' },
          { id: 4, name: 'Huawei' },
          { id: 5, name: 'OPPO' },
          { id: 6, name: 'Vivo' }
        ]);
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // If category changes, reload brands for that category
    if (name === 'category') {
      // Reset brand selection when category changes
      setFormData(prev => ({
        ...prev,
        [name]: value,
        brand: ''
      }));

      if (value) {
        try {
          const categoryBrands = await apiService.getBrands(parseInt(value));
          setBrands(categoryBrands);
        } catch (error) {
          console.error('Error loading brands for category:', error);
        }
      } else {
        // If no category selected, show all brands
        try {
          const allBrands = await apiService.getBrands();
          setBrands(allBrands);
        } catch (error) {
          console.error('Error loading all brands:', error);
        }
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      showAlert?.(
        t.userError,
        () => {}
      );
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user_id', user.id.toString());
      formDataToSend.append('category_id', formData.category);
      formDataToSend.append('brand_id', formData.brand);
      formDataToSend.append('model', formData.model);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('contact_phone', formData.phone);

      if (photo) {
        formDataToSend.append('photo', photo);
      }

      await apiService.createAdvertisement(formDataToSend);

      showAlert?.(
        t.createSuccess,
        () => {
          // Reset form
          setFormData({
            category: '',
            brand: '',
            model: '',
            price: '',
            description: '',
            city: '',
            phone: ''
          });
          setPhoto(null);
          navigate('/my-ads');
        }
      );
    } catch (error) {
      console.error('Error creating advertisement:', error);
      showAlert?.(
        t.createError,
        () => {}
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.category && formData.brand && formData.model &&
                     formData.price && formData.description && formData.city && formData.phone && photo && !dataLoading;

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
            {t.createAd}
          </h1>
          <div className="w-16"></div>
        </div>

        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 card-enhanced p-6 rounded-2xl">
            {/* Category */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.category} *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              >
                <option value="">{t.selectCategory}</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id.toString()}>
                    {language === 'ru' ? cat.name_ru : cat.name_uz}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.brand} *
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              >
                <option value="">{t.selectBrand}</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id.toString()}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.model} *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder={t.modelPlaceholder}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.price} *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder={t.pricePlaceholder}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.description} *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder={t.descriptionPlaceholder}
                rows={4}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus resize-none"
                required
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.city} *
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              >
                <option value="">{t.selectCity}</option>
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.phone} *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder={t.phonePlaceholder}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              />
            </div>

            {/* Photo */}
            <div>
              <label className="block text-telegram-text font-medium mb-2">
                {t.photo} *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full input-enhanced border border-telegram-input-border bg-telegram-input-bg text-telegram-input-text focus:outline-none focus:ring-2 focus:ring-telegram-input-focus focus:border-telegram-input-focus"
                required
              />
              {photo && (
                <p className="text-sm text-telegram-hint mt-2">
                  {t.photoSelected}{photo.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
                isFormValid && !loading
                  ? 'btn-primary text-telegram-button-text shadow-telegram-lg hover:shadow-telegram-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              }`}
            >
              {loading
                ? t.creating
                : t.createAd
              }
            </button>
          </form>

          {/* Info */}
          <div className="mt-6 p-6 card-enhanced rounded-2xl border-elegant">
            <div className="flex items-start space-x-3">
              <div className="text-2xl">💡</div>
              <div>
                <h3 className="font-semibold text-telegram-text mb-2">
                  {language === 'ru' ? 'Важная информация' : 'Muhim ma\'lumot'}
                </h3>
                <ul className="text-sm text-telegram-hint space-y-1">
                  <li>• {t.allFieldsRequired}</li>
                  <li>• {t.photoRequired}</li>
                  <li>• {t.moderationTime}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sell;