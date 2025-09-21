import React, { useState } from 'react'
import { Plus, Navigation, Clock, AlertTriangle } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import RouteForm from './RouteForm'

const CommuteWeather = () => {
  const { savedRoutes, subscriptionStatus } = useUser()
  const [showRouteForm, setShowRouteForm] = useState(false)

  // Mock route weather data
  const getRouteWeather = (route) => {
    return {
      currentConditions: 'Partly cloudy',
      temperature: 72,
      estimatedTime: '25 mins',
      alerts: Math.random() > 0.7 ? ['Heavy traffic due to rain'] : [],
      hourlyConditions: [
        { time: 'Now', condition: 'Partly cloudy', temp: 72 },
        { time: '30 min', condition: 'Cloudy', temp: 71 },
        { time: '1 hr', condition: 'Light rain', temp: 69 }
      ]
    }
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Commute Weather</h1>
        <button
          onClick={() => setShowRouteForm(true)}
          className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {savedRoutes.length === 0 ? (
        <div className="bg-surface rounded-lg p-8 text-center shadow-card">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">No Saved Routes</h3>
          <p className="text-text-secondary mb-4">
            Add your commute routes to get weather conditions along your path.
          </p>
          <button
            onClick={() => setShowRouteForm(true)}
            className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Add Route
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {savedRoutes.map((route) => {
            const weather = getRouteWeather(route)
            
            return (
              <div key={route.routeId} className="bg-surface rounded-lg p-4 shadow-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-text-primary">{route.routeName}</h3>
                    <p className="text-sm text-text-secondary">
                      {route.origin} → {route.destination}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-text-primary">{weather.temperature}°</div>
                    <div className="text-sm text-text-secondary">{weather.currentConditions}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{weather.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-text-secondary">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">Best departure: Now</span>
                  </div>
                </div>

                {weather.alerts.length > 0 && (
                  <div className="mb-4">
                    {weather.alerts.map((alert, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">{alert}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {weather.hourlyConditions.map((hour, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-md">
                      <div className="text-xs text-text-secondary font-medium">{hour.time}</div>
                      <div className="text-sm text-text-primary mt-1">{hour.temp}°</div>
                      <div className="text-xs text-text-secondary">{hour.condition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showRouteForm && (
        <RouteForm onClose={() => setShowRouteForm(false)} />
      )}
    </div>
  )
}

export default CommuteWeather