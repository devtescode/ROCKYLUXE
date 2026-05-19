'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Happy Customer',
    content: 'The quality of the jewelry is absolutely exceptional. Every piece arrived perfectly packaged and looks even more beautiful in person. Highly recommend ROCKYLUXE!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Engagement Ring Buyer',
    content: 'I bought my fiancée&apos;s engagement ring from ROCKYLUXE. The craftsmanship is impeccable and the customer service was outstanding throughout the process.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Jewelry Collector',
    content: 'As a collector, I appreciate the attention to detail in every piece. ROCKYLUXE offers luxury jewelry that is truly worth the investment.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in')
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">Customer Stories</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Hear from those who&apos;ve experienced the ROCKYLUXE difference
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="glass border border-border/50 rounded-2xl p-8 md:p-12 min-h-96 flex flex-col justify-between transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(200,162,74,0.2)] animate-fade-in-up animation-delay-200">
            {/* Quote mark */}
            <div className="text-primary/20 text-8xl font-bold mb-4 leading-none">&ldquo;</div>

            {/* Rating */}
            <div className="flex gap-1 mb-6 -mt-4">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={i} size={24} className="fill-primary text-primary transition-all" />
              ))}
            </div>

            {/* Content */}
            <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed font-medium text-pretty">
              &ldquo;{currentTestimonial.content}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-border/50">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/40 to-primary/20 flex-shrink-0 ring-2 ring-primary/30">
                <img
                  src={currentTestimonial.image}
                  alt={currentTestimonial.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-lg text-foreground">{currentTestimonial.name}</p>
                <p className="text-sm text-muted-foreground font-medium">{currentTestimonial.role}</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
              <button
                onClick={prevTestimonial}
                className="pointer-events-auto p-3 glass rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={nextTestimonial}
                className="pointer-events-auto p-3 glass rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10 animate-fade-in-up animation-delay-300">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                    ? 'w-8 h-3 bg-primary' 
                    : 'w-3 h-3 bg-muted hover:bg-muted/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
