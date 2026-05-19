'use client'

import { useState, useEffect } from 'react'
import ProductCard from '@/components/ProductCard'

export default function Shop({
  onProductClick,
}: {
  onProductClick: (product: any) => void
}) {
  const [products, setProducts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          'http://localhost:4000/jewelry/getallproducts'
        )
        const data = await res.json()

        setProducts(data)
      } catch (err) {
        console.log('Error fetching products:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section id="shop" className="relative py-24 bg-background overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-48"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header (UNCHANGED UI) */}
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

        {/* Loading UI (UNCHANGED) */}
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
          /* PRODUCTS FROM BACKEND */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product: any, index: number) => (
              <div
                key={product._id || product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <ProductCard
                  product={product}
                  onViewMore={() => onProductClick(product)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}