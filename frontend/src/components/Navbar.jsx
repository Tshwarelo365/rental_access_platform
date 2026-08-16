
import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/logo.jpg"

function Navbar() {
  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  const logout = () => {
    localStorage.clear()
    navigate("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/properties"
          className="flex items-center gap-3"
        >
          <img
            src={logo}
            alt="Rental Access"
            className="h-14 w-40 rounded-lg object-cover"
          />
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">

          <Link
            to="/properties"
            className="hover:text-blue-200 transition"
          >
            Properties
          </Link>

          {role === "landlord" && (
            <>
              <Link
                to="/create-property"
                className="hover:text-blue-200 transition"
              >
                Create Property
              </Link>

              <Link
                to="/dashboard"
                className="hover:text-blue-200 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/landlord-applications"
                className="hover:text-blue-200 transition"
              >
                Applications
              </Link>
            </>
          )}

          <button
            onClick={logout}
            className="bg-gray-700 px-4 py-2 rounded-lg
              font-semibold hover:bg-blue-600 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  )
}

export default Navbar

