import { useState } from 'react'

interface Product {
  name: string
  price: string
  images: (File | string)[]
  description: string
  availability: string
}

interface AdminProductFormProps {
  product?: (Omit<Product, 'images'> & { images?: (File | string)[], id?: string | number }) | null
  onSave: (product: any) => void
}

export default function AdminProductForm({
  product,
  onSave,
}: AdminProductFormProps) {

  const [formData, setFormData] = useState<Product>(
    product
      ? {
          name: product.name,
          price: product.price,
          images: product.images && Array.isArray(product.images)
            ? product.images
            : [],
          description: product.description,
          availability: product.availability,
        }
      : {
          name: '',
          price: '',
          images : [],
          description: '',
          availability: 'In Stock',
        }
  )

  const [isLoading, setIsLoading] = useState(false)

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | any
  ) => {
    const { name, value, files } = e.target;
    if (name === 'images') {
      const newFiles = Array.from(files || []) as File[];
      // Validate type and size
      const validFiles = newFiles.filter((file) =>
        ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type) && file.size <= 5 * 1024 * 1024
      );
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Remove a single image
  const handleRemoveImage = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  // Clear all images
  const handleClearAllImages = () => {
    setFormData((prev) => ({
      ...prev,
      images: [],
    }));
  };

  /* ================= HANDLE SUBMIT (ADD + EDIT FIXED) ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('description', formData.description);
      data.append('category', formData.availability);
      // Append all images
      formData.images.forEach((img) => {
        if (img instanceof File) {
          data.append('images', img);
        } else if (typeof img === 'string') {
          data.append('existingImages', img);
        }
      });
      // 🔥 CHECK IF EDIT OR ADD
      const isEdit = !!product;
      const url = isEdit
        ? `http://localhost:4000/jewelry/editproducts/${product!.id}`
        : `http://localhost:4000/jewelry/addproducts`;
      const method = isEdit ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        body: data,
      });
      const result = await res.json();
      if (!res.ok) {
        console.log(result);
        return;
      }
      onSave(result);
      // RESET ONLY FOR ADD
      if (!isEdit) {
        setFormData({
          name: '',
          price: '',
          images: [],
          description: '',
          availability: 'In Stock',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* GRID (UNCHANGED UI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-2">
            Price *
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        <div>
          <label className="block text-foreground font-semibold mb-2">
            Availability *
          </label>

          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
          >
            <option>In Stock</option>
            <option>Out of Stock</option>
            <option>Made to Order</option>
            <option>Coming Soon</option>
          </select>
        </div>
      </div>

      {/* IMAGES UPLOAD (Multiple, Drag & Drop, Grid Preview) */}
      <div>
        <label className="block text-foreground font-semibold mb-2">
          Product Images *
        </label>
        <div className="flex flex-col gap-3">
          <label className="flex flex-col items-center justify-center w-full min-h-[120px] rounded-2xl border-2 border-dashed border-primary/60 hover:border-primary bg-secondary/30 hover:bg-primary/10 transition-all cursor-pointer group shadow-lg">
            <div className="flex flex-col items-center justify-center py-4">
              <svg className="w-10 h-10 text-primary mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 3.13a4 4 0 010 7.75M12 7v8m0 0l-3-3m3 3l3-3" /></svg>
              <span className="text-sm text-primary font-semibold text-center">Drag & Drop or Click to Upload<br />PNG, JPG, JPEG up to 5MB each</span>
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              multiple
              onChange={handleChange}
              name="images"
              className="hidden"
            />
          </label>
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primary/40 shadow group">
                  <img
                    src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full shadow hover:bg-red-700 transition"
                    title="Remove image"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          {formData.images.length > 0 && (
            <button
              type="button"
              onClick={handleClearAllImages}
              className="mt-2 px-4 py-2 bg-destructive text-white rounded-lg text-xs font-semibold hover:bg-opacity-90 transition-all w-fit"
            >
              Clear All
            </button>
          )}
        </div>
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
          required
          rows={5}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
        />
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50"
      >
        {isLoading
          ? 'Uploading...'
          : product
          ? 'Update Product'
          : 'Add Product'}
      </button>
    </form>
  )
}