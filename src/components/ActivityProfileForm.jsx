import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const ActivityProfileForm = ({ profile, onClose }) => {
  const { addActivityProfile, updateActivityProfile } = useUser()
  const isEditing = !!profile

  const [formData, setFormData] = useState({
    activityType: profile?.activityType || '',
    preferredConditions: {
      tempMin: profile?.preferredConditions?.tempMin || '',
      tempMax: profile?.preferredConditions?.tempMax || '',
      maxWindSpeed: profile?.preferredConditions?.maxWindSpeed || '',
      maxPrecipitation: profile?.preferredConditions?.maxPrecipitation || '',
      maxUV: profile?.preferredConditions?.maxUV || '',
      preferredTime: profile?.preferredConditions?.preferredTime || 'any'
    }
  })

  const activityTypes = [
    'Running', 'Cycling', 'Walking', 'Hiking', 'Photography', 'Golf',
    'Tennis', 'Soccer', 'Baseball', 'Picnic', 'Gardening', 'Other'
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const profileData = {
      ...formData,
      preferredConditions: {
        ...formData.preferredConditions,
        tempMin: formData.preferredConditions.tempMin ? Number(formData.preferredConditions.tempMin) : null,
        tempMax: formData.preferredConditions.tempMax ? Number(formData.preferredConditions.tempMax) : null,
        maxWindSpeed: formData.preferredConditions.maxWindSpeed ? Number(formData.preferredConditions.maxWindSpeed) : null,
        maxPrecipitation: formData.preferredConditions.maxPrecipitation ? Number(formData.preferredConditions.maxPrecipitation) : null,
        maxUV: formData.preferredConditions.maxUV ? Number(formData.preferredConditions.maxUV) : null
      }
    }

    if (isEditing) {
      updateActivityProfile(profile.profileId, profileData)
    } else {
      addActivityProfile(profileData)
    }

    onClose()
  }

  const handleInputChange = (field, value) => {
    if (field.startsWith('preferredConditions.')) {
      const conditionField = field.replace('preferredConditions.', '')
      setFormData(prev => ({
        ...prev,
        preferredConditions: {
          ...prev.preferredConditions,
          [conditionField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">
              {isEditing ? 'Edit Activity Profile' : 'Create Activity Profile'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Activity Type
              </label>
              <select
                value={formData.activityType}
                onChange={(e) => handleInputChange('activityType', e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Select an activity</option>
                {activityTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Min Temperature (°F)
                </label>
                <input
                  type="number"
                  value={formData.preferredConditions.tempMin}
                  onChange={(e) => handleInputChange('preferredConditions.tempMin', e.target.value)}
                  placeholder="e.g. 60"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Max Temperature (°F)
                </label>
                <input
                  type="number"
                  value={formData.preferredConditions.tempMax}
                  onChange={(e) => handleInputChange('preferredConditions.tempMax', e.target.value)}
                  placeholder="e.g. 80"
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
                value={formData.preferredConditions.maxWindSpeed}
                onChange={(e) => handleInputChange('preferredConditions.maxWindSpeed', e.target.value)}
                placeholder="e.g. 15"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Max Precipitation Chance (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.preferredConditions.maxPrecipitation}
                onChange={(e) => handleInputChange('preferredConditions.maxPrecipitation', e.target.value)}
                placeholder="e.g. 20"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Max UV Index
              </label>
              <input
                type="number"
                min="0"
                max="11"
                value={formData.preferredConditions.maxUV}
                onChange={(e) => handleInputChange('preferredConditions.maxUV', e.target.value)}
                placeholder="e.g. 6"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Preferred Time
              </label>
              <select
                value={formData.preferredConditions.preferredTime}
                onChange={(e) => handleInputChange('preferredConditions.preferredTime', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="any">Any time</option>
                <option value="morning">Morning (6 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 6 PM)</option>
                <option value="evening">Evening (6 PM - 12 AM)</option>
              </select>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 text-text-secondary rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                {isEditing ? 'Update' : 'Create'} Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ActivityProfileForm