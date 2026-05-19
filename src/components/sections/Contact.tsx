

import { Mail, Phone, MapPin, Instagram, Smartphone, Music } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mt-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Contact
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">Get in Touch</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Have questions? We&apos;d love to hear from you. Reach out to our team anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Contact Info */}
          <div className="space-y-6 animate-slide-in-left">
            {/* Email */}
            <div className="glass border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/20 rounded-lg h-fit">
                  <Mail className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
                  <a href="mailto:contact@rockyluxe.com" className="text-muted-foreground hover:text-primary transition-colors">contact@rockyluxe.com</a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="glass border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/20 rounded-lg h-fit">
                  <Phone className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">Phone</h3>
                  <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">+1 (555) 123-4567</a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="glass border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-105">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/20 rounded-lg h-fit">
                  <MapPin className="text-primary" size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">123 Luxury Ave<br />New York, NY 10001</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h3 className="font-bold text-lg text-foreground mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:bg-green-600/20 hover:border-green-600/50 border border-border/50 transition-all duration-300 hover:scale-110"
                >
                  <Smartphone size={24} className="text-green-500" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:bg-pink-600/20 hover:border-pink-600/50 border border-border/50 transition-all duration-300 hover:scale-110"
                >
                  <Instagram size={24} className="text-pink-500" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:bg-primary/20 hover:border-primary/50 border border-border/50 transition-all duration-300 hover:scale-110"
                >
                  <Music size={24} className="text-primary" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="glass border border-border/50 rounded-2xl p-8 sm:p-10 space-y-6 animate-slide-in-right hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
            <div>
              <label className="block text-foreground font-bold mb-3">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all duration-300"
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="block text-foreground font-bold mb-3">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:bg-secondary/80 transition-all duration-300 resize-none"
                placeholder="Tell us about your inquiry..."
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-[0_0_40px_rgba(200,162,74,0.5)] transition-all duration-300 hover:scale-105"
            >
              Send Message
            </button>

            {submitted && (
              <p className="text-center text-green-400 font-semibold animate-fade-in">✓ Message sent successfully!</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
