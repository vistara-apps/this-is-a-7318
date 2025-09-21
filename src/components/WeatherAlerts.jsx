import React from 'react'
import { AlertTriangle, Info } from 'lucide-react'

const WeatherAlerts = () => {
  // Mock alerts - in production, this would come from weather service
  const alerts = [
    {
      id: 1,
      type: 'info',
      title: 'UV Index High',
      message: 'UV index will reach 8 between 11 AM - 3 PM. Consider sun protection for outdoor activities.',
      time: '2 hours ago'
    }
  ]

  if (alerts.length === 0) return null

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border-l-4 ${
            alert.type === 'warning'
              ? 'bg-yellow-50 border-yellow-400'
              : alert.type === 'danger'
              ? 'bg-red-50 border-red-400'
              : 'bg-blue-50 border-blue-400'
          }`}
        >
          <div className="flex items-start space-x-3">
            {alert.type === 'warning' || alert.type === 'danger' ? (
              <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                alert.type === 'warning' ? 'text-yellow-600' : 'text-red-600'
              }`} />
            ) : (
              <Info className="w-5 h-5 mt-0.5 text-blue-600" />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-text-primary">{alert.title}</h4>
              <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
              <p className="text-xs text-text-secondary mt-2">{alert.time}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WeatherAlerts