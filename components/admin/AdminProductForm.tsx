'use client'

import { useState } from 'react'

interface Product {
  name: string
  price: string
  image: string | File
  rating: number
  reviews: number
  description: string
  availability: string
}

interface AdminProductFormProps {
  product?: (Product & { id: number }) | null
  onSave: (product: any) => void
}

export default function AdminProductForm({
  product,
  onSave,
}: AdminProductFormProps) {

  const [formData, setFormData] = useState<Product>(
    product || {
      name: '',
      price: '',
      image: '',
      rating: 5,
      reviews: 0,
      description: '',
      availability: 'In Stock',
    }
  )

  const [isLoading, setIsLoading] = useState(false)

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsLoading(true)

      const data = new FormData()

      data.append('name', formData.name)
      data.append('price', formData.price)
      data.append('description', formData.description)
      data.append('category', formData.availability)

      // IMPORTANT: MUST MATCH backend multer.single("image")
      if (formData.image instanceof File) {
        data.append('image', formData.image)
      }

      const isEdit = !!product?.id

      const url = isEdit
        ? `http://localhost:4000/jewelry/editproducts/${product?.id}`
        : `http://localhost:4000/jewelry/addproducts`

      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: data,
      })

      const result = await res.json()

      if (!res.ok) {
        console.log(result)
        return
      }

      onSave(result)

      // RESET FORM (only for add)
      if (!isEdit) {
        setFormData({
          name: '',
          price: '',
          image: '',
          rating: 5,
          reviews: 0,
          description: '',
          availability: 'In Stock',
        })
      }

    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* NAME */}
        <div>
          <label className="block text-foreground font-semibold mb-2">
            Product Name *
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
          />
        </div>

        {/* PRICE */}
        <div>
          <label className="block text-foreground font-semibold mb-2">
            Price *
          </label>

          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
          />
        </div>

        {/* AVAILABILITY */}
        <div>
          <label className="block text-foreground font-semibold mb-2">
            Availability *
          </label>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
            <option>Made to Order</option>
            <option>Coming Soon</option>
          </select>
        </div>
      </div>

      {/* IMAGE */}
      <div>
        <label className="block text-foreground font-semibold mb-2">
          Image *
        </label>

        {formData.image ? (
          <div className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg border">

            <div className="w-16 h-16 rounded-lg overflow-hidden bg-background">
              <img
                src={
                  typeof formData.image === 'string'
                    ? formData.image
                    : URL.createObjectURL(formData.image)
                }
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-sm font-medium">
                {formData.image instanceof File
                  ? formData.image.name
                  : 'Image selected'}
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                handleChange({
                  target: { name: 'image', value: '' },
                })
              }
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="block p-6 border-2 border-dashed rounded-lg cursor-pointer text-center">
            <p className="text-sm">Click to upload image</p>

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleChange({
                  target: {
                    name: 'image',
                    value: e.target.files?.[0],
                  },
                })
              }
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* DESCRIPTION */}
      <div>
        <label className="block text-foreground font-semibold mb-2">
          Description *
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg"
      >
        {isLoading
          ? 'Processing...'
          : product
          ? 'Update Product'
          : 'Add Product'}
      </button>
    </form>
  )
} 