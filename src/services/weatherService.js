import axios from 'axios'

// Demo weather service with mock data
// In production, you would use a real API key and endpoints
class WeatherService {
  constructor() {
    // For demo purposes, we'll use mock data
    // In production, you would use: process.env.VITE_OPENWEATHER_API_KEY
    this.apiKey = 'demo_key'
    this.baseUrl = 'https://api.openweathermap.org/data/2.5'
  }

  // Mock current weather data
  getMockCurrentWeather() {
    return {
      temperature: 72,
      feelsLike: 75,
      humidity: 65,
      windSpeed: 8,
      windDirection: 'NW',
      visibility: 10,
      uvIndex: 5,
      pressure: 1013,
      condition: 'partly-cloudy',
      description: 'Partly cloudy with good visibility',
      icon: '02d',
      timestamp: new Date().toISOString()
    }
  }

  // Mock hourly forecast data
  getMockHourlyForecast() {
    const hours = []
    const baseTemp = 72
    const conditions = ['sunny', 'partly-cloudy', 'cloudy', 'rain-light']
    
    for (let i = 0; i < 24; i++) {
      const time = new Date()
      time.setHours(time.getHours() + i)
      
      hours.push({
        time: time.toISOString(),
        temperature: baseTemp + Math.random() * 10 - 5,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation: Math.random() * 100,
        windSpeed: 5 + Math.random() * 10,
        humidity: 50 + Math.random() * 30
      })
    }
    
    return hours
  }

  // Mock daily forecast data
  getMockDailyForecast() {
    const days = []
    const baseTemp = 72
    const conditions = ['sunny', 'partly-cloudy', 'cloudy', 'rain', 'thunderstorm']
    
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      
      days.push({
        date: date.toISOString(),
        tempHigh: baseTemp + Math.random() * 15,
        tempLow: baseTemp - Math.random() * 15,
        condition: conditions[Math.floor(Math.random() * conditions.length)],
        precipitation: Math.random() * 100,
        windSpeed: 5 + Math.random() * 15,
        humidity: 40 + Math.random() * 40
      })
    }
    
    return days
  }

  async getCurrentWeather(lat, lon) {
    // In production, replace with actual API call
    // const response = await axios.get(`${this.baseUrl}/weather`, {
    //   params: {
    //     lat,
    //     lon,
    //     appid: this.apiKey,
    //     units: 'imperial'
    //   }
    // })
    
    // For demo, return mock data
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getMockCurrentWeather()), 500)
    })
  }

  async getHourlyForecast(lat, lon) {
    // In production, replace with actual API call
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getMockHourlyForecast()), 700)
    })
  }

  async getDailyForecast(lat, lon) {
    // In production, replace with actual API call
    return new Promise(resolve => {
      setTimeout(() => resolve(this.getMockDailyForecast()), 600)
    })
  }

  async searchLocation(query) {
    // Mock location search
    const mockLocations = [
      { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194 },
      { name: 'New York, NY', lat: 40.7128, lon: -74.0060 },
      { name: 'Los Angeles, CA', lat: 34.0522, lon: -118.2437 },
      { name: 'Chicago, IL', lat: 41.8781, lon: -87.6298 },
      { name: 'Miami, FL', lat: 25.7617, lon: -80.1918 }
    ]
    
    return mockLocations.filter(location => 
      location.name.toLowerCase().includes(query.toLowerCase())
    )
  }

  // Activity-specific weather analysis
  analyzeForActivity(weatherData, activityProfile) {
    const { preferredConditions } = activityProfile
    const current = weatherData
    
    let score = 100
    const recommendations = []
    
    // Temperature analysis
    if (preferredConditions.tempMin && current.temperature < preferredConditions.tempMin) {
      score -= 20
      recommendations.push('Temperature is below your preferred range')
    }
    if (preferredConditions.tempMax && current.temperature > preferredConditions.tempMax) {
      score -= 20
      recommendations.push('Temperature is above your preferred range')
    }
    
    // Wind analysis
    if (preferredConditions.maxWindSpeed && current.windSpeed > preferredConditions.maxWindSpeed) {
      score -= 15
      recommendations.push('Wind speed is higher than preferred')
    }
    
    // Precipitation analysis
    if (preferredConditions.maxPrecipitation && current.precipitation > preferredConditions.maxPrecipitation) {
      score -= 25
      recommendations.push('Precipitation chance is higher than preferred')
    }
    
    // UV analysis for outdoor activities
    if (preferredConditions.maxUV && current.uvIndex > preferredConditions.maxUV) {
      score -= 10
      recommendations.push('UV index is higher than preferred')
    }
    
    return {
      score: Math.max(0, score),
      recommendations,
      ideal: score >= 80,
      acceptable: score >= 60
    }
  }
}

export const weatherService = new WeatherService()