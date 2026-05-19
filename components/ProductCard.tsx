'use client'

import { Heart, Star } from 'lucide-react'
// import Image from 'next/image'
import { useState } from 'react'

interface Product {
  id: number
  name: string
  price: string
  imageURL: string
  rating: number
  reviews: number
}

export default function ProductCard({
  product,
  onViewMore,
}: {
  product: Product
  onViewMore: () => void
}) {
  const [isLiked, setIsLiked] = useState(false)

  const whatsappMessage = `Hello, I want to order: ${product.name}, Price: ${product.price}`
  const whatsappLink = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <div className="group relative h-full glass border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(200,162,74,0.2)] hover:scale-105">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-secondary">
        <img
          src={product.imageURL}
          alt={product.name}
          className="object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
        />
        
        {/* Premium Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-semibold text-primary">
          Premium
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
          <div className="w-full p-6 space-y-3">
            <button
              onClick={onViewMore}
              className="w-full px-4 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
            >
              View Details
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 block text-center"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2.5 glass rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 z-10 hover:scale-110"
        >
          <Heart
            size={20}
            className={`transition-all duration-300 ${isLiked ? 'fill-destructive text-destructive' : 'text-foreground'}`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`transition-colors ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted/50'}`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {/* {product.rating} */}
            </span>
            <span className="text-xs text-muted-foreground">
              {/* ({product.reviews}) */}
            </span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-3xl font-bold text-gradient">{product.price}</p>
          <p className="text-xs text-muted-foreground mt-2">Luxury Jewelry</p>
        </div>
      </div>
    </div>
  )
}
