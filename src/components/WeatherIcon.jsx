import React from 'react'
import { Sun, Cloud, CloudRain, CloudSnow, Zap, CloudDrizzle, Sunrise } from 'lucide-react'

const WeatherIcon = ({ condition, size = 'medium', className = '' }) => {
  const sizes = {
    small: 'w-5 h-5',
    medium: 'w-6 h-6',
    large: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  const iconSize = sizes[size] || sizes.medium

  const getIcon = () => {
    switch (condition) {
      case 'sunny':
      case 'clear':
        return <Sun className={`${iconSize} ${className}`} />
      case 'partly-cloudy':
        return <div className={`relative ${iconSize} ${className}`}>
          <Sun className="absolute w-3/4 h-3/4" />
          <Cloud className="absolute bottom-0 right-0 w-3/4 h-3/4 opacity-70" />
        </div>
      case 'cloudy':
        return <Cloud className={`${iconSize} ${className}`} />
      case 'rain':
        return <CloudRain className={`${iconSize} ${className}`} />
      case 'rain-light':
      case 'drizzle':
        return <CloudDrizzle className={`${iconSize} ${className}`} />
      case 'snow':
        return <CloudSnow className={`${iconSize} ${className}`} />
      case 'thunderstorm':
        return <Zap className={`${iconSize} ${className}`} />
      case 'sunrise':
      case 'sunset':
        return <Sunrise className={`${iconSize} ${className}`} />
      default:
        return <Sun className={`${iconSize} ${className}`} />
    }
  }

  return getIcon()
}

export default WeatherIcon