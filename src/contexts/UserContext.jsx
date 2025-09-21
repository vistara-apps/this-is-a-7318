import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [activityProfiles, setActivityProfiles] = useState([])
  const [savedRoutes, setSavedRoutes] = useState([])
  const [subscriptionStatus, setSubscriptionStatus] = useState('free')

  useEffect(() => {
    // Load user data from localStorage
    const userData = localStorage.getItem('momentum-weather-user')
    const profilesData = localStorage.getItem('momentum-weather-profiles')
    const routesData = localStorage.getItem('momentum-weather-routes')
    const subData = localStorage.getItem('momentum-weather-subscription')
    
    if (userData) setUser(JSON.parse(userData))
    if (profilesData) setActivityProfiles(JSON.parse(profilesData))
    if (routesData) setSavedRoutes(JSON.parse(routesData))
    if (subData) setSubscriptionStatus(subData)
  }, [])

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('momentum-weather-user', JSON.stringify(userData))
  }

  const addActivityProfile = (profile) => {
    const newProfile = {
      ...profile,
      profileId: Date.now().toString(),
      userId: user?.userId || 'default'
    }
    const updatedProfiles = [...activityProfiles, newProfile]
    setActivityProfiles(updatedProfiles)
    localStorage.setItem('momentum-weather-profiles', JSON.stringify(updatedProfiles))
  }

  const updateActivityProfile = (profileId, updates) => {
    const updatedProfiles = activityProfiles.map(profile =>
      profile.profileId === profileId ? { ...profile, ...updates } : profile
    )
    setActivityProfiles(updatedProfiles)
    localStorage.setItem('momentum-weather-profiles', JSON.stringify(updatedProfiles))
  }

  const deleteActivityProfile = (profileId) => {
    const updatedProfiles = activityProfiles.filter(profile => profile.profileId !== profileId)
    setActivityProfiles(updatedProfiles)
    localStorage.setItem('momentum-weather-profiles', JSON.stringify(updatedProfiles))
  }

  const addSavedRoute = (route) => {
    const newRoute = {
      ...route,
      routeId: Date.now().toString(),
      userId: user?.userId || 'default'
    }
    const updatedRoutes = [...savedRoutes, newRoute]
    setSavedRoutes(updatedRoutes)
    localStorage.setItem('momentum-weather-routes', JSON.stringify(updatedRoutes))
  }

  const deleteSavedRoute = (routeId) => {
    const updatedRoutes = savedRoutes.filter(route => route.routeId !== routeId)
    setSavedRoutes(updatedRoutes)
    localStorage.setItem('momentum-weather-routes', JSON.stringify(updatedRoutes))
  }

  const upgradeSubscription = (plan) => {
    setSubscriptionStatus(plan)
    localStorage.setItem('momentum-weather-subscription', plan)
  }

  const value = {
    user,
    activityProfiles,
    savedRoutes,
    subscriptionStatus,
    updateUser,
    addActivityProfile,
    updateActivityProfile,
    deleteActivityProfile,
    addSavedRoute,
    deleteSavedRoute,
    upgradeSubscription
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}