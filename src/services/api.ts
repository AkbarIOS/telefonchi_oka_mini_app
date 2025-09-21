import axios, { AxiosInstance } from 'axios';
import { Advertisement } from '../types/telegram';

class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    // TODO: Replace with your actual API base URL
    this.baseURL = process.env.REACT_APP_API_URL || 'https://telefonchi-backend-working.loca.lt/api';

    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'bypass-tunnel-reminder': 'true',
      },
    });

    // Add request interceptor to include Telegram auth
    this.api.interceptors.request.use(
      (config) => {
        const initData = window.Telegram?.WebApp?.initData;
        if (initData) {
          config.headers.Authorization = `tma ${initData}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  // Get user's advertisements
  async getUserAdvertisements(userId: number, status?: string): Promise<Advertisement[]> {
    try {
      const params = status ? { status } : {};
      const response = await this.api.get(`/users/${userId}/advertisements`, { params });
      return response.data.advertisements || [];
    } catch (error) {
      console.error('Error fetching user advertisements:', error);
      throw new Error('Failed to fetch advertisements');
    }
  }

  // Mark advertisement as sold
  async markAdvertisementSold(adId: number): Promise<void> {
    try {
      await this.api.post(`/advertisements/${adId}/sold`);
    } catch (error) {
      console.error('Error marking advertisement as sold:', error);
      throw new Error('Failed to mark advertisement as sold');
    }
  }

  // Get all advertisements (for browsing)
  async getAdvertisements(params?: {
    page?: number;
    limit?: number;
    category?: string;
    brand?: string;
    city?: string;
    status?: string;
  }): Promise<{
    advertisements: Advertisement[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await this.api.get('/advertisements', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching advertisements:', error);
      throw new Error('Failed to fetch advertisements');
    }
  }

  // Create new advertisement
  async createAdvertisement(adData: FormData): Promise<Advertisement> {
    try {
      const response = await this.api.post('/advertisements', adData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.advertisement;
    } catch (error) {
      console.error('Error creating advertisement:', error);
      throw new Error('Failed to create advertisement');
    }
  }

  // Update advertisement
  async updateAdvertisement(adId: number, adData: FormData): Promise<Advertisement> {
    try {
      const response = await this.api.put(`/advertisements/${adId}`, adData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.advertisement;
    } catch (error) {
      console.error('Error updating advertisement:', error);
      throw new Error('Failed to update advertisement');
    }
  }

  // Delete advertisement
  async deleteAdvertisement(adId: number): Promise<void> {
    try {
      await this.api.delete(`/advertisements/${adId}`);
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      throw new Error('Failed to delete advertisement');
    }
  }

  // Get categories
  async getCategories(): Promise<Array<{ id: number; name_ru: string; name_uz: string }>> {
    try {
      const response = await this.api.get('/categories');
      return response.data.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Failed to fetch categories');
    }
  }

  // Get brands
  async getBrands(categoryId?: number): Promise<Array<{ id: number; name: string }>> {
    try {
      const params = categoryId ? { category_id: categoryId } : {};
      const response = await this.api.get('/brands', { params });
      return response.data.brands || [];
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw new Error('Failed to fetch brands');
    }
  }

  // Validate Telegram Web App data
  async validateTelegramData(initData: string): Promise<{
    valid: boolean;
    user?: any;
  }> {
    try {
      const response = await this.api.post('/auth/validate', { initData });
      return response.data;
    } catch (error) {
      console.error('Error validating Telegram data:', error);
      throw new Error('Failed to validate Telegram data');
    }
  }
}

export const apiService = new ApiService();
export default apiService;