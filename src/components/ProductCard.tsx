'use client'

import { FaWhatsapp } from 'react-icons/fa'
import { getPrimaryImage, toImageArray } from '@/lib/productImages'
import WhatsAppOrderButton from '@/components/WhatsAppOrderButton'
import type { Product } from '@/types/product'

export default function ProductCard({
  product,
  onViewMore,
}: {
  product: Product
  onViewMore: () => void
}) {
  const images = toImageArray(product.imageURLs)
  const primaryImage = getPrimaryImage(product.imageURLs)
  const extraCount = images.length > 1 ? images.length - 1 : 0

  return (
    <div className="group relative glass border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(200,162,74,0.2)] hover:scale-102">
      <div className="relative h-72 overflow-hidden bg-secondary">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}

        {extraCount > 0 && (
          <div className="absolute bottom-16 right-4 px-2.5 py-1 bg-black/70 text-white text-xs font-semibold rounded-full">
            +{extraCount} more
          </div>
        )}

        <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-semibold text-white shadow-md">
          {product.name}
        </div>

        <WhatsAppOrderButton
          product={product}
          className="absolute top-4 right-4 p-2.5 glass rounded-full transition-all duration-300 z-10 hover:scale-110 bg-green-600 text-white hover:bg-green-700"
        >
          <FaWhatsapp size={20} aria-hidden />
          <span className="sr-only">Order on WhatsApp</span>
        </WhatsAppOrderButton>

        <button
          type="button"
          onClick={onViewMore}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 bg-primary text-primary-foreground rounded-full shadow-lg font-semibold text-sm transition-all duration-300 hover:bg-primary/90 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          View Details
        </button>
      </div>

      <div className="p-6 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-0 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          {product.category && (
            <span className="inline-block mt-2 px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground">
              {product.category}
            </span>
          )}
        </div>

        <div>
          <div className="w-full p-0 mt-2">
            <WhatsAppOrderButton
              product={product}
              className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 block text-center shadow-md"
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <FaWhatsapp size={18} />
                Order on WhatsApp
              </span>
            </WhatsAppOrderButton>
          </div>
          <p className="text-3xl font-bold text-gradient mt-2">₦{product.price.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}
