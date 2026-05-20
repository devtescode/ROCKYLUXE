import { useState, useEffect } from 'react'
import AdminDashboard from '@/components/admin/AdminDashboard'

// const API_URL = ""

interface AdminLoginProps {
  onSuccess: () => void
}

function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // const res = await fetch("http://localhost:4000/admin/login", {
      const res = await fetch("https://rockyluxe-bd.onrender.com/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      sessionStorage.setItem("adminAuth", "true")
      sessionStorage.setItem("token", data.token)

      onSuccess()
    } catch (err) {
      setError("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>

        <div className="relative bg-card border border-border rounded-2xl p-8 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">ROCKYLUXE</h1>
            <h2 className="text-2xl font-bold text-foreground mb-2">Admin Login</h2>
            <p className="text-muted-foreground">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">

            {/* EMAIL */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-foreground font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                disabled={isLoading}
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 mt-4 py-3 bg-primary text-primary-foreground font-bold rounded-lg"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ================= REGISTER ================= */
function AdminRegister({ onSuccess }: { onSuccess: () => void }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch("https://rockyluxe-bd.onrender.com/admin/register", {
        // const res = await fetch("http://localhost:4000/jewelry/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName,
          email,
          password
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Registration failed")
        return
      }

      // onSuccess()
      onSuccess && onSuccess()
    } catch (err) {
      setError("Network error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        </div>
        <div className="relative bg-card border border-border rounded-2xl p-8">

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">ROCKYLUXE</h1>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Admin</h2>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              disabled={isLoading}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              disabled={isLoading}
            />

            {error && (
              <p className="text-red-500 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg"
            >
              {isLoading ? "Creating..." : "Create Admin"}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

/* ================= MAIN PAGE ================= */
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [adminExists, setAdminExists] = useState<boolean | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await fetch("https://rockyluxe-bd.onrender.com/admin/status")
        const data = await res.json()

        setAdminExists(data.adminExists)

        const auth = sessionStorage.getItem("adminAuth")
        if (auth === "true") {
          setIsAuthenticated(true)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    checkAdmin()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  // =========================
  // STEP 1: NO ADMIN → REGISTER
  // =========================
  if (adminExists === false && !showLogin) {
    return (
      <AdminRegister
        onSuccess={() => {
          // 🔥 AFTER REGISTER → FORCE LOGIN PAGE
          setShowLogin(true)
        }}
      />
    )
  }

  // =========================
  // STEP 2: LOGIN PAGE
  // =========================
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onSuccess={() => setIsAuthenticated(true)}
      />
    )
  }

  // =========================
  // STEP 3: DASHBOARD
  // =========================
  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}