'use client'

import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { toImageArray } from '@/lib/productImages'
import type { Product } from '@/types/product'

export default function ProductModal({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const images = toImageArray(product.imageURLs)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const productId = product._id ?? product.id

  useEffect(() => {
    setCurrentImageIndex(0)
  }, [productId])

  const whatsappMessage = `Hello, I want to order: ${product.name}, Price: ₦${product.price}`
  const whatsappLink = `https://wa.me/2348167408709?text=${encodeURIComponent(whatsappMessage)}`

  const goToImage = (index: number) => {
    if (images.length <= 1 || index === currentImageIndex) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentImageIndex(index)
      setIsAnimating(false)
    }, 150)
  }

  const nextImage = () => {
    goToImage((currentImageIndex + 1) % images.length)
  }

  const prevImage = () => {
    goToImage((currentImageIndex - 1 + images.length) % images.length)
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
        className="bg-black rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex justify-between items-center p-6 border-b border-border bg-black z-10">
          <h2 className="text-2xl font-bold text-foreground">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="text-foreground" size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative bg-secondary rounded-xl overflow-hidden h-96">
            {images.length > 0 ? (
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} - image ${currentImageIndex + 1}`}
                className={`object-cover w-full h-full transition-opacity duration-150 ${
                  isAnimating ? 'opacity-50' : 'opacity-100'
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No images available
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors z-10"
                >
                  <ChevronLeft className="text-primary-foreground" size={24} />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-primary/80 hover:bg-primary rounded-full transition-colors z-10"
                >
                  <ChevronRight className="text-primary-foreground" size={24} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white text-sm rounded-full">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((url, idx) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => goToImage(idx)}
                  className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? 'border-primary scale-105'
                      : 'border-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center flex-wrap gap-3">
              <p className="text-4xl font-bold text-primary">₦{product.price}</p>
              {product.category && (
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    product.category === 'In Stock'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {product.category}
                </span>
              )}
            </div>

            {product.description && (
              <p className="text-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            )}

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
                type="button"
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
