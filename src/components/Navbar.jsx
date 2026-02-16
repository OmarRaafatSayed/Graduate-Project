import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="logo">MASHRABIYA</div>
        <ul className="nav-links">
          <li onClick={() => scrollToSection('home')}>HOME</li>
          <li onClick={() => scrollToSection('video')}>Video</li>
          <li onClick={() => scrollToSection('story')}>Story</li>
          <li onClick={() => scrollToSection('restoration')}>Restoration Machine</li>
        </ul>
      </div>
    </nav>
  )
}
