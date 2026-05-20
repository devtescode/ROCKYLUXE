import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      if (isOpen) setIsOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOpen])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setIsOpen(false)
  }

  // Render overlay and menu at the top level for full viewport coverage
  return (
    <>
      {/* Overlay Blur - covers the whole viewport and closes menu on click */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 backdrop-blur-3xl bg-black/60 opacity-100 transition-all duration-500"
          style={{
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            backdropFilter: 'blur(32px) saturate(180%)',
            transition: 'backdrop-filter 0.5s, background 0.5s, opacity 0.5s',
          }}
          aria-hidden={!isOpen}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Animated Mobile Menu */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled 
          ? 'bg-background/95 glass border-none border-border/50 backdrop-blur-sm' 
          : 'bg-background border-none border-transparent'
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
              {isOpen ? "" : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Animated Mobile Menu */}
        <div
          className={`md:hidden fixed left-1/2 top-0 z-50 w-[92vw] max-w-sm -translate-x-1/2 transition-transform duration-500 ease-[cubic-bezier(.77,0,.18,1.01)] ${
            isOpen ? 'translate-y-4 opacity-100 scale-100 pointer-events-auto' : '-translate-y-20 opacity-0 scale-95 pointer-events-none'
          }`}
          style={{
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            // border: '1.5px solid rgba(255,255,255,0.18)',
            borderRadius: '1rem',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(18px) saturate(180%)',
            WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          }}
        >
          <div className="flex flex-col gap-4 py-8 px-7">
            <span className="text-center text-2xl font-extrabold tracking-widest text-primary drop-shadow-lg mb-2 animate-pulse select-none">
              MENU
            </span>
            <button
              onClick={() => scrollToSection('shop')}
              className="w-full text-left px-5 py-3 text-xl font-bold text-foreground/90 rounded-xl bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/30 hover:text-primary transition-all shadow-sm backdrop-blur-md border border-primary/20"
            >
              Shop
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="w-full text-left px-5 py-3 text-xl font-bold text-foreground/90 rounded-xl bg-gradient-to-r from-secondary/10 to-transparent hover:from-secondary/30 hover:text-secondary transition-all shadow-sm backdrop-blur-md border border-secondary/20"
            >
               About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left px-5 py-3 text-xl font-bold text-foreground/90 rounded-xl bg-gradient-to-r from-accent/10 to-transparent hover:from-accent/30 hover:text-accent transition-all shadow-sm backdrop-blur-md border border-accent/20"
            >
               Contact
            </button>
            <Link
              to="/admin"
              className="w-full block px-5 py-3 text-xl font-bold bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:opacity-90 text-center transition-all shadow-lg border border-primary/40"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
