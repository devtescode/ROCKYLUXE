'use client'

import { useEffect, useState } from 'react'
import { LogOut, Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import AdminProductForm from './AdminProductForm'
import { toImageArray } from '@/lib/productImages'
import type { AdminFormProduct } from '@/types/product'



interface Product {
  _id: string
  name: string
  price: string | number
  imageURLs: string | string[]
  description: string
  category: string
}

interface AdminDashboardProps {
  onLogout: () => void
}

export default function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState<
    'products' | 'settings'
  >('products')

  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] =
    useState<AdminFormProduct | null>(null)

  const [loading, setLoading] = useState(true)

  /* ================= GET PRODUCTS ================= */
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        // 'http://localhost:4000/jewelry/getallproducts'
        'https://rockyluxe-bd.onrender.com/jewelry/getallproducts'
      )

      const data = await res.json()

      setProducts(data)
    } catch (err) {
      console.log(err)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to fetch products',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    onLogout()
  }

  /* ================= DELETE PRODUCT ================= */
  const handleDeleteProduct = async (id: string) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: 'This product will be permanently deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
    })

    if (!result.isConfirmed) return

    try {
      const res = await fetch(
        // `http://localhost:4000/jewelry/deleteproducts/${id}`,
        `https://rockyluxe-bd.onrender.com/jewelry/deleteproducts/${id}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Delete failed',
        })

        return
      }

      setProducts(products.filter((p) => p._id !== id))

      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Product deleted successfully',
      })
    } catch (err) {
      console.log(err)

      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Something went wrong',
      })
    }
  }

  /* ================= SAVE PRODUCT ================= */
  const handleSaveProduct = async () => {
    fetchProducts()
    setShowForm(false)
    setEditingProduct(null)
  }




  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  })

  const [passwordLoading, setPasswordLoading] = useState(false)

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false)

  const [showNewPassword, setShowNewPassword] =
    useState(false)

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    })
  }

  const handleUpdatePassword = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      setPasswordLoading(true)

      const res = await fetch(
        'https://rockyluxe-bd.onrender.com/admin/changepassword',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(passwordData),
        }
      )

      const data = await res.json()

      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || 'Failed to update password',
        })

        return
      }

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password updated successfully',
      })

      setPasswordData({
        currentPassword: '',
        newPassword: '',
      })
    } catch (err) {
      console.log(err)

      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: 'Something went wrong',
      })
    } finally {
      setPasswordLoading(false)
    }
  }

  const BackToHome = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="bg-black border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div>
            <h1 className="text-3xl font-bold text-primary">
              ROCKYLUXE
            </h1>

            <p className="text-sm text-muted-foreground">
              Admin Dashboard
            </p>
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
        {/* TABS */}
        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${activeTab === 'products'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-semibold border-b-2 transition-colors ${activeTab === 'settings'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
          >
            Settings
          </button>
        </div>

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            {/* ADD BUTTON */}
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

            {/* FORM */}
            {showForm && (
              <div className="mb-8 bg-card border border-border rounded-xl p-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {editingProduct
                    ? 'Edit Product'
                    : 'Add New Product'}
                </h3>

                <AdminProductForm
                  key={editingProduct?.id ?? 'new'}
                  product={editingProduct}
                  onSave={handleSaveProduct}
                />
              </div>
            )}

            {/* PRODUCTS TABLE */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary border-b border-border">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-semibold">
                        Images
                      </th>

                      <th className="px-6 py-4 text-left text-foreground font-semibold">
                        Product Name
                      </th>

                      <th className="px-6 py-4 text-left text-foreground font-semibold">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-foreground font-semibold">
                        Availability
                      </th>

                      <th className="px-6 py-4 text-right text-foreground font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-border">
                    {loading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-10 text-muted-foreground"
                        >
                          Loading products...
                        </td>
                      </tr>
                    ) : products.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-10 text-muted-foreground"
                        >
                          No products found
                        </td>
                      </tr>
                    ) : (
                      products.map((product) => (
                        <tr
                          key={product._id}
                          className="hover:bg-secondary/50 transition-colors"
                        >
                          {/* IMAGES */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              {toImageArray(product.imageURLs)
                                .slice(0, 3)
                                .map((url, i) => (
                                  <div
                                    key={i}
                                    className="w-12 h-12 rounded-lg overflow-hidden bg-secondary border border-border shrink-0"
                                  >
                                    <img
                                      src={url}
                                      alt={`${product.name} ${i + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                ))}
                              {toImageArray(product.imageURLs).length > 3 && (
                                <span className="text-xs font-semibold text-muted-foreground ml-1">
                                  +{toImageArray(product.imageURLs).length - 3}
                                </span>
                              )}
                              {toImageArray(product.imageURLs).length === 0 && (
                                <span className="text-xs text-muted-foreground">No image</span>
                              )}
                            </div>
                          </td>

                          {/* NAME */}
                          <td className="px-6 py-4 text-foreground">
                            {product.name}
                          </td>

                          {/* PRICE */}
                          <td className="px-6 py-4 text-primary font-semibold">
                            ₦{product.price.toLocaleString()}
                          </td>

                          {/* CATEGORY */}
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${product.category === 'In Stock'
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                                }`}
                            >
                              {product.category}
                            </span>
                          </td>

                          {/* ACTIONS */}
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingProduct({
                                    name: product.name,
                                    price: String(product.price),
                                    images: toImageArray(product.imageURLs),
                                    description: product.description,
                                    availability: product.category,
                                    id: product._id,
                                  })
                                  setShowForm(true)
                                }}
                                className="p-2 bg-primary/20 text-primary rounded hover:bg-primary/30 transition-colors"
                              >
                                <Edit size={18} />
                              </button>

                              <button
                                onClick={() =>
                                  handleDeleteProduct(product._id)
                                }
                                className="p-2 bg-destructive/20 text-destructive rounded hover:bg-destructive/30 transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
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
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Change Password
                </h4>

                <form
                  onSubmit={handleUpdatePassword}
                  className="space-y-4"
                >
                  {/* CURRENT PASSWORD */}
                  {/* <div> */}
                    

                    {/* CURRENT PASSWORD */}
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        Current Password
                      </label>

                      <div className="relative mt-5">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                          placeholder="Enter current password"
                          required
                        />  
                        <button
                          type="button"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showCurrentPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* NEW PASSWORD */}
                    <div>
                      <label className="block text-foreground font-semibold mb-2">
                        New Password
                      </label>

                      <div className="relative mt-5">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary"
                          placeholder="Enter new password"
                          required
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowNewPassword(!showNewPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {showNewPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* BUTTON */}
                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
                    >
                      {passwordLoading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
              </div>

              {/* Store Info */}
              {/* <div className="pt-8 border-t border-border">
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
              </div> */}
            </div>
          </div>
        )}
      </div>

      {/* Back to Home Link */}
      <div className="text-center py-8">
        <div
          // href="/"
          onClick={BackToHome}
          className="text-primary hover:text-primary/80 transition-colors font-semibold"
        >
          ← Back to Home
        </div>
      </div>
    </div>
  )
}
