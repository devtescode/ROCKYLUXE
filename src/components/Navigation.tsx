import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
      isScrolled 
        ? 'bg-background/95 glass border-b border-border/50 backdrop-blur-sm' 
        : 'bg-background border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logo.jpg"
              alt="ROCKYLUXE"
              className="w-10 h-10 object-cover rounded"
            />
            <span className="text-primary font-bold text-xl hidden sm:inline">ROCKYLUXE</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('shop')} className="text-foreground hover:text-primary transition-colors">
              Shop
            </button>
            <button onClick={() => scrollToSection('about')} className="text-foreground hover:text-primary transition-colors">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors">
              Contact
            </button>
            <Link to="/admin" className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-4 border-t border-border">
            <button onClick={() => scrollToSection('shop')} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary">
              Shop
            </button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-foreground hover:text-primary">
              Contact
            </button>
            <Link to="/admin" className="block px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
