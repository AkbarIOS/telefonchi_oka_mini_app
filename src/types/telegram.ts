export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
}

export interface TelegramWebApp {
  initData: string;
  initDataUnsafe: {
    user?: TelegramUser;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
  };
  version: string;
  platform: string;
  colorScheme: 'light' | 'dark';
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  BackButton: {
    isVisible: boolean;
    show(): void;
    hide(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isProgressVisible: boolean;
    isActive: boolean;
    setText(text: string): void;
    show(): void;
    hide(): void;
    enable(): void;
    disable(): void;
    showProgress(leaveActive?: boolean): void;
    hideProgress(): void;
    onClick(callback: () => void): void;
    offClick(callback: () => void): void;
  };
  ready(): void;
  expand(): void;
  close(): void;
  sendData(data: string): void;
  openLink(url: string): void;
  openTelegramLink(url: string): void;
  showPopup(params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(message: string, callback?: (confirmed: boolean) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (granted: boolean) => void): void;
}

export interface Advertisement {
  id: number;
  model: string;
  price: number;
  description: string;
  phone: string;
  city: string;
  contact_phone: string;
  photo_path?: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  created_at: string;
  category_name: string;
  brand_name: string;
  username?: string;
}

export interface Category {
  id: number;
  name_ru: string;
  name_uz: string;
}

export interface Brand {
  id: number;
  name: string;
}