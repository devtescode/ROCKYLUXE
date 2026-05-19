'use client'

import { useState } from 'react'
import Hero from '@/components/sections/Hero'
import Shop from '@/components/sections/Shop'
import About from '@/components/sections/About'
import HowItWorks from '@/components/sections/HowItWorks'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import FAQ from '@/components/sections/FAQ'
import Navigation from '@/components/Navigation'
import WhatsAppButton from '@/components/WhatsAppButton'
import ProductModal from '@/components/ProductModal'
import Footer from '@/components/Footer'

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const openModal = (product: any) => {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  return (
    <div className="bg-background">
      <Navigation />
      <Hero />
      <Shop onProductClick={openModal} />
      <About />
      <HowItWorks />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
      <WhatsAppButton />
      {modalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setModalOpen(false)} />
      )}
    </div>
  )
}
