
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api/axios"
import logo from "../assets/logo.jpg"

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "tenant"
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    try {
      await api.post("/auth/register", formData)

      alert("Account created successfully!")

      navigate("/")
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data
      )

      alert(
        error.response?.data?.detail ||
        "Registration failed"
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

            <img
              src={logo}
              alt="Rental Access Logo"
              className="w-50 h-20 rounded-xl object-cover"
            />

            <span className="text-2xl font-bold">
              Rental Access
            </span>

            </div>

            <p className="text-blue-200
              font-semibold text-sm
              uppercase tracking-wider mb-4">

              Get started today

            </p>

            <h1 className="text-5xl font-bold
              leading-tight">

              Your next home
              <span className="text-blue-200">
                {" "}starts here.
              </span>

            </h1>

            <p className="text-blue-100
              text-lg leading-relaxed mt-6">

              Create your account and connect
              with rental opportunities through
              one simple platform.

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
                  Find available rental properties
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
                  Submit rental applications
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
                  Manage properties as a landlord
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

              <img
                src={logo}
                alt="Rental Access Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />

              <span>Rental Access</span>
            </Link>

          </div>

          {/* Register Card */}
          <div className="bg-white
            rounded-2xl
            border border-gray-100
            shadow-xl
            p-8 md:p-10">

            {/* Header */}
            <div className="mb-8">

              <p className="text-blue-600
                font-semibold text-sm mb-2">

                GET STARTED

              </p>

              <h2 className="text-3xl
                font-bold text-gray-900">

                Create your account

              </h2>

              <p className="text-gray-500 mt-2">

                Join Rental Access and get started.

              </p>

            </div>

            <form onSubmit={handleSubmit}>

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
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
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
              <div className="mb-5">

                <label
                  className="block text-sm
                    font-semibold text-gray-700 mb-2"
                >
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
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

              {/* Account Type */}
              <div className="mb-7">

                <label
                  className="block text-sm
                    font-semibold text-gray-700 mb-2"
                >
                  Account type
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
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
                >

                  <option value="tenant">
                    Tenant — Looking for a property
                  </option>

                  <option value="landlord">
                    Landlord — Listing a property
                  </option>

                </select>

              </div>

              {/* Create Account */}
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
                  ? "Creating account..."
                  : "Create Account"}

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

            {/* Login */}
            <div className="text-center">

              <p className="text-gray-500">

                Already have an account?{" "}

                <Link
                  to="/"
                  className="text-blue-600
                    font-semibold
                    hover:text-blue-700
                    transition"
                >
                  Sign in
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

export default Register

