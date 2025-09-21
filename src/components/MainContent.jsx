import React from 'react'
import Dashboard from './Dashboard'
import ActivityProfiles from './ActivityProfiles'
import CommuteWeather from './CommuteWeather'
import EventPlanning from './EventPlanning'

const MainContent = ({ currentView }) => {
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
      case 'activities':
        return <ActivityProfiles />
      case 'commute':
        return <CommuteWeather />
      case 'events':
        return <EventPlanning />
      default:
        return <Dashboard />
    }
  }

  return (
    <main className="flex-1 overflow-y-auto">
      {renderView()}
    </main>
  )
}

export default MainContent