
import { useState } from "react"
import api from "../api/axios"
import { useNavigate, Link } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      const formData = new URLSearchParams()

      formData.append("username", email)
      formData.append("password", password)

      const response = await api.post("/auth/login", formData)

      const token = response.data.access_token

      localStorage.setItem("token", token)
      localStorage.setItem("role", response.data.role)

      navigate("/properties")

    } catch (error) {
      console.error("Login failed:", error.response?.data)

      alert(
        error.response?.data?.detail ||
        "Invalid email or password"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2
        relative overflow-hidden
        bg-gradient-to-br from-blue-700
        via-blue-600 to-indigo-700
        text-white">

        {/* Decorative circles */}
        <div className="absolute -top-32 -right-32
          w-96 h-96 bg-white/10
          rounded-full blur-2xl" />

        <div className="absolute -bottom-40 -left-20
          w-96 h-96 bg-indigo-400/20
          rounded-full blur-3xl" />

        <div className="relative z-10
          flex items-center justify-center
          w-full p-16">

          <div className="max-w-lg">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">

              <div className="w-12 h-12
                bg-white/15 backdrop-blur
                border border-white/20
                rounded-xl flex items-center
                justify-center">

                <span className="text-2xl">
                  🏠
                </span>

              </div>

              <span className="text-2xl font-bold">
                Rental Access
              </span>

            </div>

            <p className="text-blue-200
              font-semibold text-sm
              uppercase tracking-wider mb-4">

              Your rental journey starts here

            </p>

            <h1 className="text-5xl font-bold
              leading-tight">

              Find a place you'll love
              <span className="text-blue-200">
                {" "}to call home.
              </span>

            </h1>

            <p className="text-blue-100
              text-lg leading-relaxed mt-6">

              Discover rental properties, apply
              online, and manage your applications
              from one simple platform.

            </p>

            {/* Features */}
            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-10 h-10
                  rounded-full bg-white/10
                  flex items-center justify-center">

                  <span className="text-green-300">
                    ✓
                  </span>

                </div>

                <span className="text-blue-50">
                  Browse available properties
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10
                  rounded-full bg-white/10
                  flex items-center justify-center">

                  <span className="text-green-300">
                    ✓
                  </span>

                </div>

                <span className="text-blue-50">
                  Apply for your next home
                </span>

              </div>

              <div className="flex items-center gap-4">

                <div className="w-10 h-10
                  rounded-full bg-white/10
                  flex items-center justify-center">

                  <span className="text-green-300">
                    ✓
                  </span>

                </div>

                <span className="text-blue-50">
                  Manage your rental properties
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2
        flex items-center justify-center
        px-6 py-12">

        <div className="w-full max-w-md">

          {/* Mobile Logo */}
          <div className="lg:hidden
            flex justify-center mb-8">

            <Link
              to="/"
              className="flex items-center gap-2
                text-2xl font-bold text-gray-900"
            >

              <span>
                🏠
              </span>

              Rental Access

            </Link>

          </div>

          {/* Login Card */}
          <div className="bg-white
            rounded-2xl
            border border-gray-100
            shadow-xl p-8 md:p-10">

            {/* Header */}
            <div className="mb-8">

              <p className="text-blue-600
                font-semibold text-sm mb-2">

                WELCOME BACK

              </p>

              <h2 className="text-3xl
                font-bold text-gray-900">

                Sign in to your account

              </h2>

              <p className="text-gray-500 mt-2">

                Enter your details to continue.

              </p>

            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}
              <div className="mb-5">

                <label
                  className="block text-sm
                    font-semibold text-gray-700 mb-2"
                >
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3.5
                    border border-gray-300
                    rounded-xl
                    bg-gray-50
                    focus:bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition"
                />

              </div>

              {/* Password */}
              <div className="mb-7">

                <div className="flex
                  justify-between items-center mb-2">

                  <label
                    className="block text-sm
                      font-semibold text-gray-700"
                  >
                    Password
                  </label>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3.5
                    border border-gray-300
                    rounded-xl
                    bg-gray-50
                    focus:bg-white
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-transparent
                    transition"
                />

              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full
                  bg-blue-600
                  text-white
                  py-3.5
                  rounded-xl
                  font-semibold
                  hover:bg-blue-700
                  active:scale-[0.99]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                  transition-all
                  shadow-sm hover:shadow-md"
              >

                {loading
                  ? "Signing in..."
                  : "Sign in"}

              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center
              gap-4 my-7">

              <div className="h-px bg-gray-200 flex-1" />

              <span className="text-xs
                text-gray-400 uppercase">
                or
              </span>

              <div className="h-px bg-gray-200 flex-1" />

            </div>

            {/* Register */}
            <div className="text-center">

              <p className="text-gray-500">

                Don't have an account?{" "}

                <Link
                  to="/register"
                  className="text-blue-600
                    font-semibold
                    hover:text-blue-700
                    transition"
                >
                  Create one
                </Link>

              </p>

            </div>

          </div>

          {/* Footer */}
          <p className="text-center
            text-xs text-gray-400 mt-6">

            Secure rental management made simple.

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login

