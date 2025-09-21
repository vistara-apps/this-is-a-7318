# Momentum Weather App

A modern, responsive weather application built with React, featuring real-time weather data and a beautiful dark mode toggle.

## 🌟 Features

### ✨ New Features (Latest Update)
- **Modern Dark Mode Toggle**: Beautiful animated toggle with sun/moon icons
- **Real Weather API Integration**: Live data from OpenWeatherMap API
- **Automatic Theme Detection**: Respects system preference on first visit
- **Smooth Transitions**: All UI elements transition smoothly between themes

### 🌤️ Weather Features
- Current weather conditions with detailed metrics
- 24-hour hourly forecast
- 7-day daily forecast  
- Activity-specific weather recommendations
- Location search and geolocation support
- Weather alerts and notifications

### 🎨 UI/UX Features
- Responsive design for all devices
- Glass morphism effects
- Smooth animations and transitions
- Modern component library
- Accessibility-focused design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/vistara-apps/this-is-a-7318.git
cd this-is-a-7318
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Get your free OpenWeatherMap API key:
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Copy your API key to `.env`:
   ```
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

5. Start the development server
```bash
npm run dev
```

## 🌙 Dark Mode

The app features a modern dark mode toggle located in the header. The toggle:
- Automatically detects your system preference
- Remembers your choice in localStorage
- Provides smooth transitions between themes
- Updates all components consistently

## 🌐 Weather API

The app uses OpenWeatherMap API for real weather data:
- **Free tier**: 1,000 API calls per day
- **Automatic fallback**: Uses mock data if no API key is provided
- **Error handling**: Graceful degradation with user-friendly messages
- **Data refresh**: Automatic updates every 10-30 minutes

## 🏗️ Architecture

- **React 18** with modern hooks and context
- **Tailwind CSS** for styling with dark mode support
- **React Query** for efficient API state management
- **Axios** for HTTP requests
- **Lucide React** for beautiful icons
- **Vite** for fast development and building

## 📱 Components

### Core Components
- `ThemeContext` - Manages dark/light mode state
- `WeatherContext` - Handles weather data and API calls
- `ThemeToggle` - Modern animated toggle component
- `CurrentWeatherCard` - Main weather display
- `HourlyForecast` - 24-hour forecast component

### Theme Support
All components include dark mode variants with:
- Consistent color schemes
- Smooth transitions
- Proper contrast ratios
- Accessibility compliance

## 🎯 Usage

### Dark Mode Toggle
Click the toggle in the header to switch between light and dark modes. Your preference is automatically saved.

### Weather Data
- **With API Key**: Real-time data from OpenWeatherMap
- **Without API Key**: Mock data for development/demo purposes
- **Location**: Uses geolocation or manual search

### Activity Profiles
Create custom activity profiles to get weather recommendations tailored to your specific needs.

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Environment Variables
- `VITE_OPENWEATHER_API_KEY` - Your OpenWeatherMap API key

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons
- [React Query](https://tanstack.com/query/) for data management