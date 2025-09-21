import React from 'react'
import { Thermometer, Droplets, Wind, Eye, Sun } from 'lucide-react'
import WeatherIcon from './WeatherIcon'

const CurrentWeatherCard = ({ weather }) => {
  if (!weather) return null

  const {
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    windDirection,
    visibility,
    uvIndex,
    condition,
    description
  } = weather

  return (
    <div className="bg-gradient-to-br from-primary to-primary/80 dark:from-primary-dark dark:to-primary-dark/80 rounded-xl p-6 text-white shadow-card transition-colors duration-300">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold">{Math.round(temperature)}°</h2>
          <p className="text-white/80">Feels like {Math.round(feelsLike)}°</p>
        </div>
        <WeatherIcon condition={condition} size="large" className="text-white" />
      </div>
      
      <p className="text-white/90 mb-6 capitalize">{description}</p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Droplets className="w-4 h-4 text-white/70" />
          <div>
            <div className="text-sm text-white/70">Humidity</div>
            <div className="font-medium">{humidity}%</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-white/70" />
          <div>
            <div className="text-sm text-white/70">Wind</div>
            <div className="font-medium">{Math.round(windSpeed)} mph {windDirection}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-white/70" />
          <div>
            <div className="text-sm text-white/70">Visibility</div>
            <div className="font-medium">{visibility} mi</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Sun className="w-4 h-4 text-white/70" />
          <div>
            <div className="text-sm text-white/70">UV Index</div>
            <div className="font-medium">{uvIndex}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeatherCard