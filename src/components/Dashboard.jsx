import React from 'react'
import { useWeather } from '../contexts/WeatherContext'
import { useUser } from '../contexts/UserContext'
import CurrentWeatherCard from './CurrentWeatherCard'
import HourlyForecast from './HourlyForecast'
import ActivityRecommendations from './ActivityRecommendations'
import WeatherAlerts from './WeatherAlerts'
import LoadingSpinner from './LoadingSpinner'

const Dashboard = () => {
  const { currentWeather, hourlyForecast, isLoading, error } = useWeather()
  const { activityProfiles } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 transition-colors duration-300">
          <p className="text-red-700 dark:text-red-400">Error loading weather data. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <CurrentWeatherCard weather={currentWeather} />
      
      <WeatherAlerts />
      
      <HourlyForecast forecast={hourlyForecast} />
      
      {activityProfiles.length > 0 && (
        <ActivityRecommendations 
          weather={currentWeather}
          activities={activityProfiles}
        />
      )}
      
      {activityProfiles.length === 0 && (
        <div className="bg-surface rounded-lg p-6 shadow-card">
          <h3 className="font-semibold text-lg mb-2">Get Started</h3>
          <p className="text-text-secondary mb-4">
            Create your first activity profile to get personalized weather recommendations.
          </p>
          <button className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors">
            Create Activity Profile
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard