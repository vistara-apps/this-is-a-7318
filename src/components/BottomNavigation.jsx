import React from 'react'
import { Home, Activity, Navigation, Calendar } from 'lucide-react'

const BottomNavigation = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'activities', icon: Activity, label: 'Activities' },
    { id: 'commute', icon: Navigation, label: 'Commute' },
    { id: 'events', icon: Calendar, label: 'Events' }
  ]

  return (
    <nav className="bg-surface border-t border-gray-200">
      <div className="flex">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`flex-1 py-3 px-2 flex flex-col items-center space-y-1 transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation