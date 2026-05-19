'use client'

import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { FaTiktok } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  const policies = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms & Conditions', href: '#' },
    { label: 'Delivery Info', href: '#' },
    // { label: 'Returns', href: '#' },
  ]

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: FaTiktok, href: 'https://tiktok.com', label: 'TikTok', color: 'hover:text-pink-500' },
  ]

  return (
    <footer className="bg-secondary/50 glass border-t border-border relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -mr-48 -mt-48 animate-float" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -ml-40 -mb-40" />
      </div>

      <div className="relative z-10">
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 animate-fade-in-up">
            {/* Brand section */}
            <div className="space-y-4 animate-fade-in-up animation-delay-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary-foreground">RL</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gradient">ROCKYLUXE</h3>
                  <p className="text-xs text-muted-foreground">Luxury Jewelry</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Crafted with elegance, designed for those who appreciate timeless beauty and sophistication.
              </p>
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 flex items-center justify-center rounded-lg glass transition-smooth ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4 animate-fade-in-up animation-delay-200">
              <h4 className="text-lg font-bold text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-4 animate-fade-in-up animation-delay-300">
              <h4 className="text-lg font-bold text-foreground">Policies</h4>
              <ul className="space-y-2">
                {policies.map((policy) => (
                  <li key={policy.label}>
                    <a
                      href={policy.href}
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {policy.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4 animate-fade-in-up animation-delay-400">
              <h4 className="text-lg font-bold text-foreground">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-muted-foreground text-sm">
                      Challenge, Felele, Ibadan<br />
                      {/* Premium City, PC 12345 */}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-primary flex-shrink-0" />
                  <a href="tel:+234 816 740 8709" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    +234 816 740 8709
                  </a>
                </div>
                {/* <div className="flex items-center gap-3">
                  <Mail size={18} className="text-primary flex-shrink-0" />
                  <a href="mailto:info@rockyluxe.com" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    info@rockyluxe.com
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 my-0 animate-fade-in animation-delay-300" />

          {/* Bottom section */}
          {/* <div className="flex flex-col sm:flex-row justify-between items-center gap-4 animate-fade-in-up animation-delay-500">
            <p className="text-muted-foreground text-sm text-center sm:text-left">
              &copy; {currentYear} ROCKYLUXE. All rights reserved. Crafted with elegance.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                Sitemap
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-xs">
                Cookie Settings
              </a>
            </div>
          </div> */}
        </div>

        {/* Accent line */}
        {/* <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" /> */}
      </div>
    </footer>
  )
}
