"use client"

import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")

    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    } else {
      document.documentElement.classList.remove("dark")
      setDark(false)
    }
  }, [])

  const toggle = () => {
    const newMode = !dark
    setDark(newMode)

    if (newMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle Dark Mode"
      aria-pressed={dark}
      className="relative w-12 h-6 flex items-center rounded-full transition-colors duration-300
                 bg-black dark:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2"
    >

      <span
        className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white dark:bg-black
        transform transition-transform duration-300
        ${dark ? "translate-x-6" : "translate-x-0"}`}
      />

      <span className="absolute left-2 text-white dark:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="5" />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.05l-1.4-1.4M6.45 6.45l-1.4-1.4m12.9 0l-1.4 1.4M6.45 17.55l-1.4 1.4"
          />
        </svg>
      </span>

      <span className="absolute right-2 text-white dark:text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-3 h-3"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 0111.21 3c0-.34.02-.67.05-1A7 7 0 1019 20.95c-.33.03-.66.05-1 .05a9 9 0 013-8.21z" />
        </svg>
      </span>
    </button>
  )
}