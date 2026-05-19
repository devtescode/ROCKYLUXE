

import { ShoppingBag, Eye, MessageCircle, Truck } from 'lucide-react'
import { useEffect, useRef } from 'react'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Browse Products',
    description: 'Explore our curated collection of luxury jewelry pieces'
  },
  {
    icon: Eye,
    title: 'View Details',
    description: 'Click on any product to see high-quality images and details'
  },
  {
    icon: MessageCircle,
    title: 'Order on WhatsApp',
    description: 'Click "Order Now" and chat with us directly on WhatsApp'
  },
  {
    icon: Truck,
    title: 'Delivery',
    description: 'We deliver your beautiful jewelry piece to your doorstep'
  }
]

export default function HowItWorks() {
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

  return (
    <section ref={sectionRef} className="relative py-24 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-48 animate-float"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Process
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">How It Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple yet elegant steps to get your luxury jewelry delivered to your doorstep
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-32 -right-4 w-8 h-1 bg-gradient-to-r from-primary to-primary/30"></div>
                )}

                {/* Card */}
                <div className="relative h-full glass border border-border/50 rounded-2xl p-6 sm:p-8 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(200,162,74,0.2)] transition-all duration-500 hover:scale-105 group">
                  {/* Step Number Background */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-300"></div>

                  {/* Step Number */}
                  <div className="absolute -top-5 right-4 w-12 h-12 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/30">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-6 p-4 bg-primary/15 rounded-xl w-fit border border-primary/20 group-hover:border-primary/50 transition-colors">
                    <Icon className="text-primary group-hover:scale-110 transition-transform duration-300" size={36} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
