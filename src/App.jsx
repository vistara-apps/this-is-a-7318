import React, { useState, useEffect } from 'react'
import { WeatherProvider } from './contexts/WeatherContext'
import { UserProvider } from './contexts/UserContext'
import Header from './components/Header'
import MainContent from './components/MainContent'
import BottomNavigation from './components/BottomNavigation'
import OnboardingFlow from './components/OnboardingFlow'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [isOnboarded, setIsOnboarded] = useState(false)

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingStatus = localStorage.getItem('momentum-weather-onboarded')
    setIsOnboarded(onboardingStatus === 'true')
  }, [])

  const completeOnboarding = () => {
    localStorage.setItem('momentum-weather-onboarded', 'true')
    setIsOnboarded(true)
  }

  if (!isOnboarded) {
    return (
      <UserProvider>
        <OnboardingFlow onComplete={completeOnboarding} />
      </UserProvider>
    )
  }

  return (
    <UserProvider>
      <WeatherProvider>
        <div className="h-full flex flex-col bg-bg">
          <Header />
          <MainContent currentView={currentView} />
          <BottomNavigation currentView={currentView} onViewChange={setCurrentView} />
        </div>
      </WeatherProvider>
    </UserProvider>
  )
}

export default App