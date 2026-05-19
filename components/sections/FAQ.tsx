'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    id: 1,
    question: 'How do I place an order?',
    answer: 'Simply click the "Order Now" button on any product, and you&apos;ll be redirected to WhatsApp where you can chat with us directly to complete your order.'
  },
  {
    id: 2,
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for all items. If you&apos;re not completely satisfied with your purchase, you can return it for a full refund or exchange.'
  },
  {
    id: 3,
    question: 'Do you offer custom designs?',
    answer: 'Yes! We specialize in custom jewelry designs. Contact us on WhatsApp or email to discuss your unique design ideas with our artisans.'
  },
  {
    id: 4,
    question: 'What materials do you use?',
    answer: 'We use only the finest materials including 18K gold, premium diamonds, sapphires, emeralds, and other precious gemstones.'
  },
  {
    id: 5,
    question: 'How long does delivery take?',
    answer: 'Standard delivery typically takes 5-7 business days. Custom orders may take 2-4 weeks depending on complexity.'
  },
  {
    id: 6,
    question: 'Are your jewelry pieces certified?',
    answer: 'Yes, all our diamond and gemstone jewelry comes with authentic certifications from recognized gemological institutes.'
  }
]

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
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
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-4">
            Support
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">Frequently Asked Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Find answers to all your questions about ROCKYLUXE and our services
          </p>
        </div>

        <div className="space-y-4 animate-fade-in-up animation-delay-200">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex justify-between items-center p-6 sm:p-7 glass border border-border/50 rounded-xl hover:border-primary/50 hover:shadow-[0_0_40px_rgba(200,162,74,0.2)] transition-all duration-300 group"
              >
                <span className="text-lg sm:text-xl font-bold text-foreground text-left group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`text-primary flex-shrink-0 transition-transform duration-500 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                  size={28}
                />
              </button>

              {openId === faq.id && (
                <div className="px-6 sm:px-7 py-6 glass border border-border/50 border-t-0 rounded-b-xl bg-secondary/30 animate-fade-in">
                  <p className="text-muted-foreground leading-relaxed text-lg">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center p-8 sm:p-12 glass border border-border/50 rounded-2xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-in-up animation-delay-400">
          <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Didn&apos;t find your answer?</h3>
          <p className="text-lg text-muted-foreground mb-8">
            Chat with us on WhatsApp or email us directly. Our team is here to help!
          </p>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-[0_0_50px_rgba(200,162,74,0.5)] transition-all duration-300 hover:scale-105"
          >
            Chat on WhatsApp Now
          </a>
        </div>
      </div>
    </section>
  )
}
