import React, { useState } from 'react'
import { Plus, Edit3, Trash2 } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import ActivityProfileForm from './ActivityProfileForm'
import UpgradePrompt from './UpgradePrompt'

const ActivityProfiles = () => {
  const { activityProfiles, subscriptionStatus, deleteActivityProfile } = useUser()
  const [showForm, setShowForm] = useState(false)
  const [editingProfile, setEditingProfile] = useState(null)

  const canAddMore = subscriptionStatus !== 'free' || activityProfiles.length === 0

  const handleEdit = (profile) => {
    setEditingProfile(profile)
    setShowForm(true)
  }

  const handleDelete = (profileId) => {
    if (confirm('Are you sure you want to delete this activity profile?')) {
      deleteActivityProfile(profileId)
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProfile(null)
  }

  return (
    <div className="p-4 space-y-4 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">Activity Profiles</h1>
        {canAddMore && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>

      {!canAddMore && (
        <UpgradePrompt 
          message="Upgrade to create unlimited activity profiles"
          features={['Unlimited activity profiles', 'Advanced condition settings', 'Historical weather analysis']}
        />
      )}

      {activityProfiles.length === 0 ? (
        <div className="bg-surface rounded-lg p-8 text-center shadow-card">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">No Activity Profiles</h3>
            <p className="text-text-secondary mb-4">
              Create your first activity profile to get personalized weather recommendations.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary text-white px-6 py-2 rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Create Profile
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {activityProfiles.map((profile) => (
            <div
              key={profile.profileId}
              className="bg-surface rounded-lg p-4 shadow-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary">{profile.activityType}</h3>
                  <div className="text-sm text-text-secondary mt-1">
                    <div className="flex flex-wrap gap-4">
                      {profile.preferredConditions.tempMin && profile.preferredConditions.tempMax && (
                        <span>Temp: {profile.preferredConditions.tempMin}° - {profile.preferredConditions.tempMax}°</span>
                      )}
                      {profile.preferredConditions.maxWindSpeed && (
                        <span>Max Wind: {profile.preferredConditions.maxWindSpeed} mph</span>
                      )}
                      {profile.preferredConditions.maxPrecipitation && (
                        <span>Max Rain: {profile.preferredConditions.maxPrecipitation}%</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(profile)}
                    className="p-2 text-text-secondary hover:text-primary transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(profile.profileId)}
                    className="p-2 text-text-secondary hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ActivityProfileForm
          profile={editingProfile}
          onClose={handleFormClose}
        />
      )}
    </div>
  )
}

export default ActivityProfiles