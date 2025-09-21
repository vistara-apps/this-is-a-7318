import React from 'react'
import { Crown, Zap } from 'lucide-react'

const SubscriptionBadge = ({ status }) => {
  if (status === 'free') {
    return (
      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
        Free
      </div>
    )
  }

  if (status === 'active-lite') {
    return (
      <div className="bg-accent/10 text-accent px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
        <Zap className="w-3 h-3" />
        <span>Active Lite</span>
      </div>
    )
  }

  if (status === 'pro-planner') {
    return (
      <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs font-medium flex items-center space-x-1">
        <Crown className="w-3 h-3" />
        <span>Pro Planner</span>
      </div>
    )
  }

  return null
}

export default SubscriptionBadge