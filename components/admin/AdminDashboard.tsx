'use client'

import { useState } from 'react'
import { LogOut, Plus, Trash2, Edit } from 'lucide-react'
import Link from 'next/link'
import AdminProductForm from './AdminProductForm'

interface Product {
  id: number
  name: string
  price: string
  image: string
  rating: number
  reviews: number
  description: string
  availability: string
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'settings'>('products')
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Diamond Elegance Ring',
      price: '$2,499',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 128,
      description: 'A stunning diamond ring crafted with precision and elegance.',
      availability: 'In Stock',
    },
  ])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    onLogout()
  }

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const handleSaveProduct = (product: Omit<Product, 'id'>) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...product, id: editingProduct.id } : p))
    } else {
      const newProduct = {
        ...product,
        id: Math.max(0, ...products.map(p => p.id)) + 1
      }
      setProducts([...products, newProduct])
    }
    setShowForm(false)
    setEditingProduct(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div>
            <h1 className="text-3xl font-bold text-primary">ROCKYLUXE</h1>
            <p className="text-sm text-muted-foreground">Admin Dashboard</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-destructive text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'products'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${
              activeTab === 'settings'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="mb-6">
              {!showForm ? (
                <button
                  onClick={() => {
                    setShowForm(true)
                    setEditingProduct(null)
                  }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                >
                  <Plus size={20} />
                  Add New Product
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingProduct(null)
                  }}
                  className="px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg hover:bg-opacity-80 transition-all"
                >
                  Cancel
                </button>
              )}
            </div>

            {showForm && (
              <div className="mb-8 bg-card border border-border rounded-xl p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <AdminProductForm
                  product={editingProduct}
                  onSave={handleSaveProduct}
                />
              </div>
            )}

            {/* Products List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-semibold">Product Name</th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold">Price</th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold">Availability</th>
                      <th className="px-6 py-4 text-left text-foreground font-semibold">Rating</th>
                      <th className="px-6 py-4 text-right text-foreground font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4 text-foreground">{product.name}</td>
                        <td className="px-6 py-4 text-primary font-semibold">{product.price}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            product.availability === 'In Stock'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {product.availability}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-foreground">{product.rating}/5.0</td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(product)
                                setShowForm(true)
                              }}
                              className="p-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="bg-card border border-border rounded-xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">Admin Settings</h3>

            <div className="space-y-6 max-w-2xl">
              {/* Change Password */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">Change Password</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-foreground font-semibold mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground font-semibold mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                      placeholder="Enter new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              {/* Store Info */}
              <div className="pt-8 border-t border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">Store Information</h4>
                <form className="space-y-4">
                  <div>
                    <label className="block text-foreground font-semibold mb-2">Store Name</label>
                    <input
                      type="text"
                      defaultValue="ROCKYLUXE"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground font-semibold mb-2">WhatsApp Number</label>
                    <input
                      type="text"
                      defaultValue="+1 234 567 890"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-foreground font-semibold mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="contact@rockyluxe.com"
                      className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back to Home Link */}
      <div className="text-center py-8">
        <Link
          href="/"
          className="text-primary hover:text-primary/80 transition-colors font-semibold"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
