'use client'

import { useState } from 'react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        className="hamburger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <nav className={isOpen ? 'nav-open' : ''}>
        <ul>
          <li><Link href="/" onClick={() => setIsOpen(false)}>home</Link></li>
          <li><Link href="/blog" onClick={() => setIsOpen(false)}>blog</Link></li>
          <li><Link href="/projects" onClick={() => setIsOpen(false)}>projects</Link></li>
          <li><Link href="/investments" onClick={() => setIsOpen(false)}>investments</Link></li>
          <li><Link href="/interests" onClick={() => setIsOpen(false)}>interests</Link></li>
        </ul>
      </nav>
      
      {isOpen && (
        <div className="nav-overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  )
}