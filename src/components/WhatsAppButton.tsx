'use client'

import { MessageCircle } from 'lucide-react'
import { getGeneralWhatsAppLink } from '@/lib/whatsapp'

export default function WhatsAppButton() {
  return (
    <a
      href={getGeneralWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 p-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] animate-pulse-glow"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  )
}
