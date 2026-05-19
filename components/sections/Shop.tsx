'use client'

import { useState, useEffect } from 'react'
import ProductCard from '../../components/ProductCard'

const sampleProducts = [
  {
    id: 1,
    name: 'Diamond Elegance Ring',
    price: '2,499',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 128,
    description: 'A stunning diamond ring crafted with precision and elegance. Features a 2-carat round diamond with platinum setting.',
    availability: 'In Stock',
  },
  {
    id: 2,
    name: 'Golden Glow Necklace',
    price: '$1,899',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 95,
    description: 'Exquisite gold necklace with intricate detailing. Perfect for special occasions.',
    availability: 'In Stock',
  },
  {
    id: 3,
    name: 'Sapphire Luxury Bracelet',
    price: '$3,299',
    image: 'https://images.unsplash.com/photo-1599643478821-bbb3d8e4f17b?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 156,
    description: 'Premium sapphire bracelet with gold accents. A timeless piece of luxury.',
    availability: 'In Stock',
  },
  {
    id: 4,
    name: 'Pearl Perfection Earrings',
    price: '$1,299',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 82,
    description: 'Elegant pearl earrings with diamond accents. Subtle yet sophisticated.',
    availability: 'In Stock',
  },
  {
    id: 5,
    name: 'Royal Crown Tiara',
    price: '$5,499',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop',
    rating: 5.0,
    reviews: 203,
    description: 'Handcrafted tiara for special occasions. Features premium diamonds and gold.',
    availability: 'Made to Order',
  },
  {
    id: 6,
    name: 'Emerald Mystic Ring',
    price: '$2,899',
    image: 'https://images.unsplash.com/photo-1599643478821-bbb3d8e4f17b?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 119,
    description: 'Stunning emerald ring with white diamond halo. A statement piece.',
    availability: 'In Stock',
  },
]

export default function Shop({ onProductClick }: { onProductClick: (product: any) => void }) {
  const [products, setProducts] = useState(sampleProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="shop" className="relative py-24 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-48"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-primary text-sm sm:text-base font-semibold tracking-widest uppercase mb-4">
            Curated Excellence
          </p>
          <h2 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            <span className="text-gradient">Our Collections</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked jewelry pieces that celebrate your unique style and sophistication
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="bg-muted h-72 rounded-lg mb-6"></div>
                <div className="h-5 bg-muted rounded mb-3"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ProductCard product={product} onViewMore={() => onProductClick(product)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
