import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-8 w-14 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 ease-in-out hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      <div
        className={`absolute inline-flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-200 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isDarkMode ? 'translate-x-3' : '-translate-x-3'
        }`}
      >
        {isDarkMode ? (
          <Moon className="h-3 w-3 text-gray-700" />
        ) : (
          <Sun className="h-3 w-3 text-yellow-500" />
        )}
      </div>
      
      {/* Background icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <Sun 
          className={`h-3 w-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-40 text-gray-400' : 'opacity-0'
          }`} 
        />
        <Moon 
          className={`h-3 w-3 transition-opacity duration-300 ${
            isDarkMode ? 'opacity-0' : 'opacity-40 text-gray-500'
          }`} 
        />
      </div>
    </button>
  )
}

export default ThemeToggle