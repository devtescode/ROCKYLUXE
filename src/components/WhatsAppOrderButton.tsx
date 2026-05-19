'use client'

import {
  getProductWhatsAppLink,
  type OrderProduct,
  type ProductOrderOptions,
} from '@/lib/whatsapp'

interface WhatsAppOrderButtonProps {
  product: OrderProduct
  orderOptions?: ProductOrderOptions
  className?: string
  children: React.ReactNode
}

export default function WhatsAppOrderButton({
  product,
  orderOptions,
  className = '',
  children,
}: WhatsAppOrderButtonProps) {
  const href = getProductWhatsAppLink(product, orderOptions)

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  )
}
