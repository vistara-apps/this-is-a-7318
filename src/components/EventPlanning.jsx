import React, { useState } from 'react'
import { Calendar, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

const EventPlanning = () => {
  const [eventData, setEventData] = useState({
    eventType: '',
    location: '',
    dateRange: {
      start: '',
      end: ''
    },
    timePreference: 'any'
  })
  const [analysis, setAnalysis] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const eventTypes = [
    'Outdoor Wedding', 'Picnic', 'Sports Event', 'Concert', 'Festival',
    'Graduation', 'Birthday Party', 'Corporate Event', 'Farmers Market', 'Other'
  ]

  const analyzeEvent = async () => {
    if (!eventData.eventType || !eventData.dateRange.start || !eventData.dateRange.end) {
      alert('Please fill in all required fields')
      return
    }

    setIsAnalyzing(true)
    
    // Mock analysis - in production, this would call weather service
    setTimeout(() => {
      const mockAnalysis = {
        bestDates: [
          {
            date: '2024-01-15',
            score: 95,
            conditions: 'Sunny, 75°F, light breeze',
            risk: 'Very Low'
          },
          {
            date: '2024-01-18',
            score: 88,
            conditions: 'Partly cloudy, 72°F, calm',
            risk: 'Low'
          },
          {
            date: '2024-01-22',
            score: 75,
            conditions: 'Mostly sunny, 78°F, moderate wind',
            risk: 'Low'
          }
        ],
        riskDates: [
          {
            date: '2024-01-20',
            score: 25,
            conditions: 'Thunderstorms likely, 65°F',
            risk: 'High'
          }
        ],
        recommendations: [
          'Consider morning events (8 AM - 12 PM) for best conditions',
          'Have indoor backup for dates with precipitation risk above 30%',
          'UV index will be moderate - provide shade for guests'
        ]
      }
      
      setAnalysis(mockAnalysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Very Low': return 'text-green-600'
      case 'Low': return 'text-green-500'
      case 'Medium': return 'text-yellow-500'
      case 'High': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'Very Low':
      case 'Low':
        return <CheckCircle className="w-4 h-4" />
      case 'Medium':
        return <AlertTriangle className="w-4 h-4" />
      case 'High':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <h1 className="text-2xl font-bold text-text-primary">Event Planning</h1>

      <div className="bg-surface rounded-lg p-4 shadow-card">
        <h2 className="font-semibold text-lg mb-4">Plan Your Event</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Event Type
            </label>
            <select
              value={eventData.eventType}
              onChange={(e) => setEventData(prev => ({ ...prev, eventType: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select event type</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Location
            </label>
            <input
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Enter event location"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={eventData.dateRange.start}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                End Date
              </label>
              <input
                type="date"
                value={eventData.dateRange.end}
                onChange={(e) => setEventData(prev => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value }
                }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Time Preference
            </label>
            <select
              value={eventData.timePreference}
              onChange={(e) => setEventData(prev => ({ ...prev, timePreference: e.target.value }))}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="any">Any time</option>
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
              <option value="evening">Evening (6 PM - 10 PM)</option>
            </select>
          </div>

          <button
            onClick={analyzeEvent}
            disabled={isAnalyzing}
            className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Weather Conditions'}
          </button>
        </div>
      </div>

      {analysis && (
        <div className="space-y-4">
          <div className="bg-surface rounded-lg p-4 shadow-card">
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span>Best Dates</span>
            </h3>
            
            <div className="space-y-3">
              {analysis.bestDates.map((date, index) => (
                <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-text-primary">
                      {new Date(date.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getRiskColor(date.risk)}`}>
                        Score: {date.score}/100
                      </span>
                      {getRiskIcon(date.risk)}
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary">{date.conditions}</p>
                  <p className={`text-sm font-medium ${getRiskColor(date.risk)}`}>
                    Risk: {date.risk}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {analysis.riskDates.length > 0 && (
            <div className="bg-surface rounded-lg p-4 shadow-card">
              <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span>Dates to Avoid</span>
              </h3>
              
              <div className="space-y-3">
                {analysis.riskDates.map((date, index) => (
                  <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-text-primary">
                        {new Date(date.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`font-medium ${getRiskColor(date.risk)}`}>
                          Score: {date.score}/100
                        </span>
                        {getRiskIcon(date.risk)}
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary">{date.conditions}</p>
                    <p className={`text-sm font-medium ${getRiskColor(date.risk)}`}>
                      Risk: {date.risk}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-surface rounded-lg p-4 shadow-card">
            <h3 className="font-semibold text-lg mb-4">Recommendations</h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-primary">•</span>
                  <span className="text-text-secondary">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default EventPlanning