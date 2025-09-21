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
    <nav className="bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-border-dark transition-colors duration-300">
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
                  ? 'text-primary dark:text-primary-dark'
                  : 'text-text-secondary dark:text-text-secondary-dark hover:text-text-primary dark:hover:text-text-primary-dark'
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