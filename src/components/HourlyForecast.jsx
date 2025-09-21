import React from 'react'
import WeatherIcon from './WeatherIcon'

const HourlyForecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null

  // Show next 12 hours
  const next12Hours = forecast.slice(0, 12)

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <h3 className="font-semibold text-lg mb-4">Hourly Forecast</h3>
      
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {next12Hours.map((hour, index) => {
          const time = new Date(hour.time)
          const isNow = index === 0
          
          return (
            <div
              key={index}
              className={`flex-shrink-0 text-center p-3 rounded-lg min-w-[80px] ${
                isNow ? 'bg-primary/10 border-2 border-primary/20' : 'bg-gray-50'
              }`}
            >
              <div className={`text-sm font-medium mb-2 ${
                isNow ? 'text-primary' : 'text-text-secondary'
              }`}>
                {isNow ? 'Now' : time.toLocaleTimeString([], { hour: 'numeric' })}
              </div>
              
              <div className="mb-2 flex justify-center">
                <WeatherIcon condition={hour.condition} size="medium" />
              </div>
              
              <div className="font-semibold text-text-primary">
                {Math.round(hour.temperature)}°
              </div>
              
              {hour.precipitation > 0 && (
                <div className="text-xs text-blue-600 mt-1">
                  {Math.round(hour.precipitation)}%
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HourlyForecast