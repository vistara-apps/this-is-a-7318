import React, { useState } from 'react'
import { MapPin, Settings, Search } from 'lucide-react'
import { useWeather } from '../contexts/WeatherContext'
import { useUser } from '../contexts/UserContext'
import LocationSearch from './LocationSearch'
import SubscriptionBadge from './SubscriptionBadge'

const Header = () => {
  const { location } = useWeather()
  const { subscriptionStatus } = useUser()
  const [showLocationSearch, setShowLocationSearch] = useState(false)

  return (
    <>
      <header className="bg-surface shadow-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowLocationSearch(true)}
            className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors"
          >
            <MapPin className="w-5 h-5" />
            <div className="text-left">
              <div className="font-medium text-sm">{location?.name || 'Loading...'}</div>
              <div className="text-xs text-text-secondary">Tap to change</div>
            </div>
          </button>
        </div>
        
        <div className="flex items-center space-x-3">
          <SubscriptionBadge status={subscriptionStatus} />
          <button className="p-2 text-text-secondary hover:text-primary transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>
      
      {showLocationSearch && (
        <LocationSearch onClose={() => setShowLocationSearch(false)} />
      )}
    </>
  )
}

export default Header