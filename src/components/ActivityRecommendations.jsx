import React from 'react'
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { weatherService } from '../services/weatherService'

const ActivityRecommendations = ({ weather, activities }) => {
  if (!weather || !activities.length) return null

  const getRecommendations = () => {
    return activities.map(activity => {
      const analysis = weatherService.analyzeForActivity(weather, activity)
      return {
        ...activity,
        analysis
      }
    }).sort((a, b) => b.analysis.score - a.analysis.score)
  }

  const recommendations = getRecommendations()

  const getStatusIcon = (score) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />
    if (score >= 60) return <AlertTriangle className="w-5 h-5 text-yellow-500" />
    return <XCircle className="w-5 h-5 text-red-500" />
  }

  const getStatusText = (score) => {
    if (score >= 80) return 'Ideal'
    if (score >= 60) return 'Good'
    return 'Poor'
  }

  const getStatusColor = (score) => {
    if (score >= 80) return 'bg-green-50 border-green-200'
    if (score >= 60) return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <div className="bg-surface rounded-lg p-4 shadow-card">
      <h3 className="font-semibold text-lg mb-4">Activity Recommendations</h3>
      
      <div className="space-y-3">
        {recommendations.map((activity) => (
          <div
            key={activity.profileId}
            className={`p-4 rounded-lg border ${getStatusColor(activity.analysis.score)}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                {getStatusIcon(activity.analysis.score)}
                <div>
                  <h4 className="font-medium text-text-primary">{activity.activityType}</h4>
                  <p className="text-sm text-text-secondary">
                    {getStatusText(activity.analysis.score)} conditions • Score: {activity.analysis.score}/100
                  </p>
                </div>
              </div>
            </div>
            
            {activity.analysis.recommendations.length > 0 && (
              <div className="mt-3">
                <ul className="text-sm text-text-secondary space-y-1">
                  {activity.analysis.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityRecommendations