import React from 'react'
import { Crown, Check, X } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const UpgradePrompt = ({ message, features }) => {
  const { upgradeSubscription } = useUser()
  const [showModal, setShowModal] = React.useState(false)

  const handleUpgrade = (plan) => {
    upgradeSubscription(plan)
    setShowModal(false)
  }

  return (
    <>
      <div className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Crown className="w-5 h-5 text-accent" />
          <h3 className="font-semibold text-text-primary">Upgrade for More</h3>
        </div>
        <p className="text-text-secondary mb-4">{message}</p>
        {features && (
          <ul className="text-sm text-text-secondary space-y-1 mb-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center space-x-2">
                <Check className="w-3 h-3 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="bg-accent text-white px-4 py-2 rounded-md font-medium hover:bg-accent/90 transition-colors"
        >
          View Plans
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-text-primary">Choose Your Plan</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 text-text-secondary hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Active Lite Plan */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Zap className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-semibold text-text-primary">Active Lite</h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-text-primary">$3</span>
                    <span className="text-text-secondary">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Up to 5 activity profiles</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Basic commute optimization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">7-day weather forecasts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Ad-free experience</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleUpgrade('active-lite')}
                    className="w-full bg-accent text-white py-3 px-4 rounded-md font-medium hover:bg-accent/90 transition-colors"
                  >
                    Choose Active Lite
                  </button>
                </div>

                {/* Pro Planner Plan */}
                <div className="border-2 border-primary rounded-lg p-6 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Crown className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold text-text-primary">Pro Planner</h3>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-text-primary">$7</span>
                    <span className="text-text-secondary">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Unlimited activity profiles</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Advanced commute optimization</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Historical weather analysis</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Event planning tools</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">Priority weather alerts</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-sm text-text-secondary">15-day extended forecasts</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handleUpgrade('pro-planner')}
                    className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-primary/90 transition-colors"
                  >
                    Choose Pro Planner
                  </button>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-text-secondary">
                  All plans include a 7-day free trial. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UpgradePrompt