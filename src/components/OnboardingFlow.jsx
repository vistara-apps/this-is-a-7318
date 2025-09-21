import React, { useState } from 'react'
import { ChevronRight, MapPin, Activity, CheckCircle } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const OnboardingFlow = ({ onComplete }) => {
  const { updateUser, addActivityProfile } = useUser()
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    email: '',
    location: '',
    activityType: '',
    preferredConditions: {
      tempMin: '',
      tempMax: '',
      maxWindSpeed: '',
      maxPrecipitation: ''
    }
  })

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const completeOnboarding = () => {
    // Save user data
    updateUser({
      userId: Date.now().toString(),
      email: userData.email,
      subscriptionStatus: 'free'
    })

    // Create first activity profile
    if (userData.activityType) {
      addActivityProfile({
        activityType: userData.activityType,
        preferredConditions: {
          tempMin: userData.preferredConditions.tempMin ? Number(userData.preferredConditions.tempMin) : null,
          tempMax: userData.preferredConditions.tempMax ? Number(userData.preferredConditions.tempMax) : null,
          maxWindSpeed: userData.preferredConditions.maxWindSpeed ? Number(userData.preferredConditions.maxWindSpeed) : null,
          maxPrecipitation: userData.preferredConditions.maxPrecipitation ? Number(userData.preferredConditions.maxPrecipitation) : null
        }
      })
    }

    onComplete()
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Activity className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary">Welcome to Momentum Weather</h1>
            <p className="text-text-secondary text-lg">
              Your activity, your forecast. Perfectly timed.
            </p>
            <p className="text-text-secondary">
              Get hyper-local weather forecasts tailored to your outdoor activities and commute needs.
            </p>
            <button
              onClick={nextStep}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2 mx-auto"
            >
              <span>Get Started</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Location Access</h2>
              <p className="text-text-secondary">
                We'll use your location to provide accurate, hyper-local weather forecasts.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-900 mb-2">Why we need location access:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Precise weather data for your exact area</li>
                <li>• Micro-climate alerts and conditions</li>
                <li>• Route-specific weather forecasts</li>
              </ul>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email (optional)"
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={() => {
                  // Request location permission
                  if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(
                      () => nextStep(),
                      () => nextStep() // Continue even if location is denied
                    )
                  } else {
                    nextStep()
                  }
                }}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Allow Location Access
              </button>
              <button
                onClick={nextStep}
                className="w-full text-text-secondary py-2 hover:text-text-primary transition-colors"
              >
                Skip for now
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2">Your First Activity</h2>
              <p className="text-text-secondary">
                Tell us about an activity you do regularly to get personalized recommendations.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Activity Type
                </label>
                <select
                  value={userData.activityType}
                  onChange={(e) => setUserData(prev => ({ ...prev, activityType: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select an activity</option>
                  <option value="Running">Running</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Walking">Walking</option>
                  <option value="Hiking">Hiking</option>
                  <option value="Photography">Photography</option>
                  <option value="Golf">Golf</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Min Temp (°F)
                  </label>
                  <input
                    type="number"
                    placeholder="60"
                    value={userData.preferredConditions.tempMin}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      preferredConditions: { ...prev.preferredConditions, tempMin: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Max Temp (°F)
                  </label>
                  <input
                    type="number"
                    placeholder="80"
                    value={userData.preferredConditions.tempMax}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      preferredConditions: { ...prev.preferredConditions, tempMax: e.target.value }
                    }))}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Max Wind Speed (mph)
                </label>
                <input
                  type="number"
                  placeholder="15"
                  value={userData.preferredConditions.maxWindSpeed}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    preferredConditions: { ...prev.preferredConditions, maxWindSpeed: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Max Rain Chance (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="20"
                  value={userData.preferredConditions.maxPrecipitation}
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    preferredConditions: { ...prev.preferredConditions, maxPrecipitation: e.target.value }
                  }))}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={prevStep}
                className="flex-1 py-3 px-4 border border-gray-300 text-text-secondary rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={nextStep}
                className="flex-1 py-3 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-text-primary">You're All Set!</h2>
            <p className="text-text-secondary">
              Your personalized weather dashboard is ready. You'll get tailored forecasts and recommendations based on your preferences.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <h3 className="font-medium text-blue-900 mb-2">What's next:</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• View your current weather conditions</li>
                <li>• Get activity-specific recommendations</li>
                <li>• Add commute routes for travel planning</li>
                <li>• Plan outdoor events with weather insights</li>
              </ul>
            </div>

            <button
              onClick={completeOnboarding}
              className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Start Using Momentum Weather
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl p-8 w-full max-w-md shadow-card">
        {/* Progress indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-2 h-2 rounded-full transition-colors ${
                stepNum <= step ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {renderStep()}
      </div>
    </div>
  )
}

export default OnboardingFlow