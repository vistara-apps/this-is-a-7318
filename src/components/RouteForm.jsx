import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useUser } from '../contexts/UserContext'

const RouteForm = ({ onClose }) => {
  const { addSavedRoute } = useUser()
  const [formData, setFormData] = useState({
    routeName: '',
    origin: '',
    destination: '',
    waypoints: ['']
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const routeData = {
      ...formData,
      waypoints: formData.waypoints.filter(waypoint => waypoint.trim() !== '')
    }

    addSavedRoute(routeData)
    onClose()
  }

  const addWaypoint = () => {
    setFormData(prev => ({
      ...prev,
      waypoints: [...prev.waypoints, '']
    }))
  }

  const updateWaypoint = (index, value) => {
    setFormData(prev => ({
      ...prev,
      waypoints: prev.waypoints.map((waypoint, i) => i === index ? value : waypoint)
    }))
  }

  const removeWaypoint = (index) => {
    setFormData(prev => ({
      ...prev,
      waypoints: prev.waypoints.filter((_, i) => i !== index)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary">Add Route</h2>
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
                Route Name
              </label>
              <input
                type="text"
                value={formData.routeName}
                onChange={(e) => setFormData(prev => ({ ...prev, routeName: e.target.value }))}
                placeholder="e.g. Home to Work"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Starting Point
              </label>
              <input
                type="text"
                value={formData.origin}
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                placeholder="Enter starting address"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Destination
              </label>
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="Enter destination address"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {formData.waypoints.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Waypoints (Optional)
                </label>
                <div className="space-y-2">
                  {formData.waypoints.map((waypoint, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="text"
                        value={waypoint}
                        onChange={(e) => updateWaypoint(index, e.target.value)}
                        placeholder={`Waypoint ${index + 1}`}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => removeWaypoint(index)}
                        className="px-3 py-3 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={addWaypoint}
                  className="mt-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  + Add waypoint
                </button>
              </div>
            )}

            {formData.waypoints.length === 0 && (
              <button
                type="button"
                onClick={addWaypoint}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                + Add waypoint
              </button>
            )}

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
                Save Route
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RouteForm