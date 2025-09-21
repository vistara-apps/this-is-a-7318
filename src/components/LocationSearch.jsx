import React, { useState } from 'react'
import { X, Search, MapPin } from 'lucide-react'
import { useWeather } from '../contexts/WeatherContext'
import { weatherService } from '../services/weatherService'

const LocationSearch = ({ onClose }) => {
  const { updateLocation } = useWeather()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (searchQuery) => {
    if (searchQuery.trim().length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)
    try {
      const locations = await weatherService.searchLocation(searchQuery)
      setResults(locations)
    } catch (error) {
      console.error('Error searching locations:', error)
      setResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const handleLocationSelect = (location) => {
    updateLocation(location)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md mt-20">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-text-primary">Change Location</h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search for a city or location"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center text-text-secondary">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {results.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleLocationSelect(location)}
                  className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3"
                >
                  <MapPin className="w-4 h-4 text-text-secondary" />
                  <span className="text-text-primary">{location.name}</span>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-text-secondary">
              No locations found
            </div>
          ) : (
            <div className="p-4">
              <h3 className="font-medium text-text-primary mb-3">Recent Locations</h3>
              <div className="space-y-2">
                {[
                  { name: 'Current Location', lat: 0, lon: 0 },
                  { name: 'San Francisco, CA', lat: 37.7749, lon: -122.4194 },
                  { name: 'New York, NY', lat: 40.7128, lon: -74.0060 }
                ].map((location, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(location)}
                    className="w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 rounded-md"
                  >
                    <MapPin className="w-4 h-4 text-text-secondary" />
                    <span className="text-text-primary">{location.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationSearch