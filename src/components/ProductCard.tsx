'use client'
import { Star } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
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
    <div className="group relative  glass border border-border/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_50px_rgba(200,162,74,0.2)] hover:scale-102">
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-secondary">
        <img
          src={product.imageURL} // Support both 'imageURL' and 'image' fields
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Premium Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 glass rounded-full text-xs font-semibold text-primary shadow-md">
          Premium
        </div>


        {/* WhatsApp Icon Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 p-2.5 glass rounded-full transition-all duration-300 z-10 hover:scale-110 bg-green-600 text-white hover:bg-green-700"
          aria-label="Order on WhatsApp"
        >
          <FaWhatsapp size={20} />
        </a>

        {/* View Details Button */}
        <button
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

          <div className="flex items-center gap-2 mb-0">
            <div className="flex items-center gap-0.5">
              
            </div>
            <span className="text-sm text-muted-foreground font-medium">
              {/* {product.rating} */}
            </span>
            <span className="text-xs text-muted-foreground">
              {/* ({product.reviews}) */}
            </span>
          </div>
        </div>

        {/* Price and WhatsApp */}
        <div>
          {/* <div className="w-full p-0 mt-2">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 scale-100 block text-center shadow-md"
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <FaWhatsapp size={18} /> 
                Order on WhatsApp</span>
            </a>
          </div> */}
          <p className="text-3xl font-bold text-gradient mt-0">{product.price}</p>
          {/* <p className="text-xs text-muted-foreground mt-1">Luxury Jewelry</p> */}
        </div>
      </div>
    </div>
  )
}
