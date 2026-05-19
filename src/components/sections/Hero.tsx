

import { ChevronDown } from 'lucide-react'


export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">

        <img
          src="/hero-jewelry.jpg"
          alt="Luxury Jewelry"

          className="object-cover"


        />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-1 bg-black/60 backdrop-blur-sm"></div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-2 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-primary/15 rounded-full blur-3xl animate-float opacity-25" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl">
        {/* Main heading */}
        <div className="mb-8 animate-fade-in-up">
          <p className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase mb-4">
            Welcome to elegance
          </p>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 text-foreground">
            <span className="text-gradient drop-shadow-xl">ROCKYLUXE</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"></div>
        </div>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Discover exquisite luxury jewelry crafted with precision and elegance. Each piece tells a story of timeless beauty.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up animation-delay-300">
          <button
            onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 sm:px-10 py-4 bg-primary text-primary-foreground font-bold rounded-lg text-base sm:text-lg hover:shadow-[0_0_50px_rgba(200,162,74,0.6)] transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Explore Collection</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          <a
            href="https://wa.me/2348167408709"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 sm:px-10 py-4 border-2 border-primary text-primary font-bold rounded-lg text-base sm:text-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Chat on WhatsApp
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-16 animate-fade-in-up animation-delay-400">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            100% Authentic
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Lifetime Warranty
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            Free Shipping
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-20 transform -translate-x-1/2 animate-float cursor-pointer" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-muted-foreground">Scroll to explore</p>
          <ChevronDown size={24} className="text-primary animate-bounce" />
        </div>
      </div>
    </section>
  )
}
