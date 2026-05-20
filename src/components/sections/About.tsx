


import { useEffect, useRef } from 'react'

export default function About() {
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
    <section id="about" ref={sectionRef} className="relative py-0 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 animate-float"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden glass border border-border/50 shadow-2xl shadow-primary/10 animate-slide-in-left">

            <img
              src="https://i.pinimg.com/736x/e4/71/f7/e471f701026a637d187b6fd2b580d7b5.jpg"
              alt="ROCKYLUXE Brand"

              className="object-cover hover:scale-110 transition-transform duration-500 ease-out"
            />
          </div>

          {/* Content */}
          <div className="space-y-8 animate-slide-in-right">
            <div>
              <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
                About Us
              </p>
              <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
                Crafted with <span className="text-gradient">Precision</span>
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/50"></div>
            </div>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              At ROCKYLUXE, we believe that jewelry is more than just an accessory it&apos;s a reflection of
              your personality and a celebration of life&apos;s precious moments.
            </p>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Each piece in our collection is meticulously crafted by our master artisans using the finest
              materials and traditional techniques combined with contemporary design sensibilities.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '100+', label: 'Happy Customers' },
                { value: '50+', label: 'Unique Designs' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 glass rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <p className="text-3xl sm:text-4xl font-bold text-gradient">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
