'use client'

import { useState, useEffect } from 'react'

type Theme = 'matrix' | 'amber' | 'terminal' | 'commodore' | 'gameboy'

export function LayoutWithTheme({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('terminal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.setAttribute('data-theme', savedTheme)
    } else {
      document.documentElement.setAttribute('data-theme', 'terminal')
    }
  }, [])

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <>
      <div className="theme-selector">
        <select
          value={theme}
          onChange={(e) => updateTheme(e.target.value as Theme)}
          aria-label="Select color theme"
        >
          <option value="matrix">Matrix Green</option>
          <option value="amber">Amber CRT</option>
          <option value="terminal">Terminal</option>
          <option value="commodore">Commodore 64</option>
          <option value="gameboy">Game Boy</option>
        </select>
      </div>
      {children}
    </>
  )
}