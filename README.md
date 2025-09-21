# Telefonchi Mini App

A modern React-based Telegram Mini App for the Telefonchi electronics marketplace. This app provides a seamless mobile experience for browsing and posting electronics advertisements directly within Telegram.

## Features

- 📱 **Telegram Web App Integration**: Optimized for Telegram's Mini App platform
- 🛍️ **Advertisement Browsing**: Browse electronics listings with filters
- ➕ **Post Advertisements**: Create and manage electronics advertisements
- 🌐 **Multi-language Support**: Support for Russian and Uzbek languages
- 🎨 **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- 📊 **Category & Brand Filtering**: Filter listings by categories and brands
- 🔒 **Telegram Authentication**: Secure authentication via Telegram

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router DOM
- **API Client**: Axios
- **Build Tool**: Create React App
- **Testing**: Jest, React Testing Library
- **Telegram Integration**: @twa-dev/sdk

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts for state management
├── hooks/          # Custom React hooks
├── localization/   # Language files and translations
├── pages/          # Page components
├── services/       # API service layer
├── types/          # TypeScript type definitions
├── App.tsx         # Main app component
└── index.tsx       # App entry point
```

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Telegram Bot integration (backend)
- Backend API server running

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AkbarIOS/telefonchi_oka_mini_app.git
   cd telefonchi_oka_mini_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   # Update src/services/api.ts with your backend URL
   # Update telegram integration settings if needed
   ```

4. **Start development server**
   ```bash
   npm start
   ```

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Configuration

### Backend Integration

Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'https://your-backend-domain.com'
```

### Telegram Mini App Setup

1. Configure your bot with @BotFather
2. Set up the Mini App URL in your bot configuration
3. Ensure HTTPS is used for production deployment

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

### Deployment Options

**Static Hosting (Recommended)**
- Vercel, Netlify, GitHub Pages
- Simple drag-and-drop deployment
- Automatic HTTPS

**Traditional Web Server**
- Deploy the `build` folder contents
- Configure web server for SPA routing
- Ensure HTTPS is enabled

### Environment Configuration

For production deployment:

1. **Update API endpoints** in `src/services/api.ts`
2. **Configure CORS** on your backend for the Mini App domain
3. **Set up HTTPS** - required for Telegram Mini Apps
4. **Update Telegram Bot** with production Mini App URL

## Features in Detail

### Advertisement Management
- Browse listings with image support
- Create new advertisements with photo upload
- Category and brand filtering
- Real-time search functionality

### Telegram Integration
- Seamless user authentication via Telegram
- Native Telegram UI components
- Back button handling
- Theme integration

### Multilingual Support
- Russian and Uzbek language support
- Dynamic language switching
- Localized user interface

## Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Tailwind CSS for styling
- Responsive design principles

### Testing
```bash
npm test
```

### Building
```bash
npm run build
```

## Troubleshooting

### Common Issues

**PostCSS Configuration Error**
- Ensure `postcss.config.js` uses correct plugin syntax
- Check Tailwind CSS installation

**Telegram Mini App Not Loading**
- Verify HTTPS is enabled
- Check bot configuration
- Ensure correct Mini App URL

**API Connection Issues**
- Verify backend is running
- Check CORS configuration
- Confirm API endpoint URLs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions and support, please open an issue in the GitHub repository or contact the development team.