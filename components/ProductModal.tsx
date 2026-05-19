'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: string
  imageURL: string
  rating: number
  reviews: number
  description: string
  availability: string
}

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const images = [product.imageURL]

  const whatsappMessage = `Hello, I want to order: ${product.name}, Price: ${product.price}`
  const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`

  const nextImage = () => {
    if (images.length > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
        setIsAnimating(false)
      }, 150)
    }
  }

  const prevImage = () => {
    if (images.length > 1) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
        setIsAnimating(false)
      }, 150)
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-border bg-card z-10">
          <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="text-foreground" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Carousel */}
          <div className="relative bg-secondary rounded-xl overflow-hidden h-96">
            <Image
              src={images[currentImageIndex]}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-150 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="text-primary-foreground" size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors z-10"
                >
                  <ChevronRight className="text-primary-foreground" size={24} />
                </button>
              </>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted'}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price and Availability */}
            <div className="flex justify-between items-center">
              <p className="text-4xl font-bold text-primary">{product.price}</p>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                product.availability === 'In Stock'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {product.availability}
              </span>
            </div>

            {/* Description */}
            <p className="text-foreground text-lg leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Material</p>
                <p className="font-semibold text-foreground">Premium Gold & Diamond</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Craftsmanship</p>
                <p className="font-semibold text-foreground">Handcrafted</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-opacity-90 transition-all hover:shadow-[0_0_30px_rgba(200,162,74,0.4)] text-center text-lg"
              >
                Order on WhatsApp
              </a>
              <button
                onClick={onClose}
                className="w-full px-6 py-4 border-2 border-border text-foreground font-semibold rounded-lg hover:border-primary hover:text-primary transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
