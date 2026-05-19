export interface Product {
  _id?: string
  id?: number
  name: string
  price: string | number
  imageURLs: string | string[]
  description?: string
  category?: string
}

export interface AdminFormProduct {
  name: string
  price: string
  images: (string | File)[]
  description: string
  availability: string
  id?: string
}
