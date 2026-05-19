import { getPrimaryImage } from '@/lib/productImages'
import type { Product } from '@/types/product'

/** Store WhatsApp number in international format without + or spaces */
export const WHATSAPP_NUMBER = '2348167408709'

export type OrderProduct = Pick<Product, 'name' | 'price' | 'imageURLs'>

export interface ProductOrderOptions {
  /** When set (e.g. modal carousel), only this image is referenced — not all product images */
  imageUrl?: string
  imageIndex?: number
  totalImages?: number
}

export function buildProductOrderText(
  product: OrderProduct,
  options?: ProductOrderOptions
): string {
  let message =
    `Hello, I want to order:\n\n` +
    `Product: ${product.name}\n` +
    `Price: ₦${product.price}`

  if (
    options?.totalImages &&
    options.totalImages > 1 &&
    options.imageIndex !== undefined
  ) {
    message += `\nPhoto: ${options.imageIndex + 1} of ${options.totalImages}`
  }

  const imageUrl = options?.imageUrl ?? getPrimaryImage(product.imageURLs)
  if (imageUrl) {
    message += `\n\nProduct image:\n${imageUrl}`
  }

  return message
}

export function buildWhatsAppLink(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!text?.trim()) return base
  return `${base}?text=${encodeURIComponent(text)}`
}

export function getProductWhatsAppLink(
  product: OrderProduct,
  options?: ProductOrderOptions
): string {
  return buildWhatsAppLink(buildProductOrderText(product, options))
}

export const GENERAL_WHATSAPP_MESSAGE =
  'Hello, I would like to know more about your jewelry collection.'

export function getGeneralWhatsAppLink(): string {
  return buildWhatsAppLink(GENERAL_WHATSAPP_MESSAGE)
}
