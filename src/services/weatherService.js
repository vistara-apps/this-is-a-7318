import axios from 'axios'

// Real weather service with OpenWeatherMap API
class WeatherService {
  constructor() {
    // Use environment variable for API key, fallback to demo mode if not provided
    this.apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY
    this.baseUrl = 'https://api.openweathermap.org/data/2.5'
    this.geocodingUrl = 'https://api.openweathermap.org/geo/1.0'
    this.useMockData = !this.apiKey || this.apiKey === 'demo_key'
    
    if (this.useMockData) {
      console.warn('OpenWeatherMap API key not found. Using mock data. Set VITE_OPENWEATHER_API_KEY environment variable for real data.')
    }
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
    if (this.useMockData) {
      // Fallback to mock data if no API key
      return new Promise(resolve => {
        setTimeout(() => resolve(this.getMockCurrentWeather()), 500)
      })
    }

    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'imperial'
        }
      })

      const data = response.data
      return {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        windDirection: this.getWindDirection(data.wind.deg),
        visibility: Math.round(data.visibility / 1609.34), // Convert meters to miles
        uvIndex: 0, // UV index requires separate API call
        pressure: Math.round(data.main.pressure * 0.02953), // Convert hPa to inHg
        condition: this.mapWeatherCondition(data.weather[0].id),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        timestamp: new Date().toISOString()
      }
    } catch (error) {
      console.error('Error fetching current weather:', error)
      throw new Error('Failed to fetch weather data')
    }
  }

  async getHourlyForecast(lat, lon) {
    if (this.useMockData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(this.getMockHourlyForecast()), 700)
      })
    }

    try {
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'imperial'
        }
      })

      return response.data.list.slice(0, 24).map(item => ({
        time: item.dt_txt,
        temperature: Math.round(item.main.temp),
        condition: this.mapWeatherCondition(item.weather[0].id),
        precipitation: (item.rain?.['3h'] || 0) * 100 / 3, // Convert to percentage chance
        windSpeed: Math.round(item.wind.speed),
        humidity: item.main.humidity
      }))
    } catch (error) {
      console.error('Error fetching hourly forecast:', error)
      throw new Error('Failed to fetch hourly forecast')
    }
  }

  async getDailyForecast(lat, lon) {
    if (this.useMockData) {
      return new Promise(resolve => {
        setTimeout(() => resolve(this.getMockDailyForecast()), 600)
      })
    }

    try {
      // OpenWeatherMap's One Call API would be ideal for daily forecast
      // For now, we'll use the 5-day forecast and group by day
      const response = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'imperial'
        }
      })

      // Group forecast data by day
      const dailyData = {}
      response.data.list.forEach(item => {
        const date = item.dt_txt.split(' ')[0]
        if (!dailyData[date]) {
          dailyData[date] = {
            temps: [],
            conditions: [],
            precipitation: 0,
            windSpeeds: [],
            humidity: []
          }
        }
        dailyData[date].temps.push(item.main.temp)
        dailyData[date].conditions.push(this.mapWeatherCondition(item.weather[0].id))
        dailyData[date].precipitation += (item.rain?.['3h'] || 0)
        dailyData[date].windSpeeds.push(item.wind.speed)
        dailyData[date].humidity.push(item.main.humidity)
      })

      return Object.entries(dailyData).map(([date, data]) => ({
        date: new Date(date).toISOString(),
        tempHigh: Math.round(Math.max(...data.temps)),
        tempLow: Math.round(Math.min(...data.temps)),
        condition: data.conditions[0], // Use first condition of the day
        precipitation: Math.min(data.precipitation * 100 / 24, 100), // Convert to percentage
        windSpeed: Math.round(data.windSpeeds.reduce((a, b) => a + b, 0) / data.windSpeeds.length),
        humidity: Math.round(data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length)
      })).slice(0, 7)
    } catch (error) {
      console.error('Error fetching daily forecast:', error)
      throw new Error('Failed to fetch daily forecast')
    }
  }

  async searchLocation(query) {
    if (this.useMockData) {
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

    try {
      const response = await axios.get(`${this.geocodingUrl}/direct`, {
        params: {
          q: query,
          limit: 5,
          appid: this.apiKey
        }
      })

      return response.data.map(location => ({
        name: `${location.name}${location.state ? ', ' + location.state : ''}, ${location.country}`,
        lat: location.lat,
        lon: location.lon
      }))
    } catch (error) {
      console.error('Error searching locations:', error)
      throw new Error('Failed to search locations')
    }
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

  // Helper function to convert wind degrees to direction
  getWindDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  // Helper function to map OpenWeatherMap weather IDs to our condition types
  mapWeatherCondition(weatherId) {
    if (weatherId >= 200 && weatherId < 300) return 'thunderstorm'
    if (weatherId >= 300 && weatherId < 400) return 'drizzle'
    if (weatherId >= 500 && weatherId < 600) return 'rain'
    if (weatherId >= 600 && weatherId < 700) return 'snow'
    if (weatherId >= 700 && weatherId < 800) return 'atmosphere'
    if (weatherId === 800) return 'sunny'
    if (weatherId === 801) return 'partly-cloudy'
    if (weatherId === 802) return 'partly-cloudy'
    if (weatherId === 803 || weatherId === 804) return 'cloudy'
    return 'partly-cloudy' // Default fallback
  }
}

export const weatherService = new WeatherService()