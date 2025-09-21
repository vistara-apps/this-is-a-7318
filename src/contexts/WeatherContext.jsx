import React, { createContext, useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { weatherService } from '../services/weatherService'

const WeatherContext = createContext()

export const useWeather = () => {
  const context = useContext(WeatherContext)
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider')
  }
  return context
}

export const WeatherProvider = ({ children }) => {
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)

  // Get user's current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
            name: 'Current Location'
          })
        },
        (error) => {
          setLocationError(error.message)
          // Fallback to demo location (San Francisco)
          setLocation({
            lat: 37.7749,
            lon: -122.4194,
            name: 'San Francisco, CA'
          })
        }
      )
    } else {
      setLocationError('Geolocation not supported')
      // Fallback to demo location
      setLocation({
        lat: 37.7749,
        lon: -122.4194,
        name: 'San Francisco, CA'
      })
    }
  }, [])

  // Fetch current weather
  const { data: currentWeather, isLoading: isCurrentLoading, error: currentError } = useQuery({
    queryKey: ['currentWeather', location?.lat, location?.lon],
    queryFn: () => weatherService.getCurrentWeather(location.lat, location.lon),
    enabled: !!location,
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes
  })

  // Fetch hourly forecast
  const { data: hourlyForecast, isLoading: isHourlyLoading } = useQuery({
    queryKey: ['hourlyForecast', location?.lat, location?.lon],
    queryFn: () => weatherService.getHourlyForecast(location.lat, location.lon),
    enabled: !!location,
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  })

  // Fetch daily forecast
  const { data: dailyForecast, isLoading: isDailyLoading } = useQuery({
    queryKey: ['dailyForecast', location?.lat, location?.lon],
    queryFn: () => weatherService.getDailyForecast(location.lat, location.lon),
    enabled: !!location,
    refetchInterval: 60 * 60 * 1000, // Refetch every hour
  })

  const updateLocation = (newLocation) => {
    setLocation(newLocation)
    setLocationError(null)
  }

  const value = {
    location,
    locationError,
    currentWeather,
    hourlyForecast,
    dailyForecast,
    isLoading: isCurrentLoading || isHourlyLoading || isDailyLoading,
    error: currentError,
    updateLocation
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}