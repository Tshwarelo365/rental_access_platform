
import { useEffect, useState } from "react"
import api from "../api/axios"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import PropertyCard from "../components/PropertyCard"

function Properties() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
      navigate("/")
      return
    }

    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    try {
      const response = await api.get("/properties")

      console.log("PROPERTIES FROM API:", response.data)

      setProperties(response.data)
    } catch (error) {
      console.error("Failed to load properties", error)
    } finally {
      setLoading(false)
    }
  }

  const applyForProperty = async (propertyId) => {
    try {
      const response = await api.post(
        `/applications/?property_id=${propertyId}`
      )
  
      console.log("APPLICATION CREATED:", response.data)
  
      alert("Application submitted successfully!")
    } catch (error) {
      console.error("APPLICATION ERROR:", error)
      console.error("BACKEND RESPONSE:", error.response?.data)
      console.error("STATUS:", error.response?.status)
  
      alert(
        error.response?.data?.detail ||
        "Failed to submit application"
      )
    }
  }
  const deleteProperty = async (propertyId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    )
  
    if (!confirmed) {
      return
    }
  
    try {
      await api.delete(`/properties/${propertyId}`)
  
      alert("Property deleted successfully!")
  
      fetchProperties()
    } catch (error) {
      console.error("DELETE PROPERTY ERROR:", error.response?.data)
  
      alert(
        error.response?.data?.detail ||
        "Failed to delete property"
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br
        from-blue-700 via-blue-600 to-indigo-700 text-white">

        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-96 h-96
            bg-white rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -left-20 w-80 h-80
            bg-indigo-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">

          <div className="max-w-3xl">

            

            <h1 className="text-4xl md:text-6xl font-bold
              leading-tight tracking-tight">

              Find a place you'll love
              <span className="text-blue-200">
                {" "}to call home.
              </span>

            </h1>

            <p className="text-blue-100 text-lg md:text-xl
              mt-6 max-w-2xl leading-relaxed">

              Discover quality rental properties, apply online,
              and manage your rental journey from one simple platform.

            </p>

            <div className="flex flex-wrap gap-4 mt-8">

              <button
                onClick={() =>
                  document.getElementById("properties")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-blue-700 px-6 py-3
                  rounded-xl font-semibold
                  hover:bg-blue-50 transition shadow-lg"
              >
                Browse Properties
              </button>

              {role === "landlord" && (
                <button
                  onClick={() => navigate("/create-property")}
                  className="border border-white/40
                    bg-white/10 px-6 py-3 rounded-xl
                    font-semibold hover:bg-white/20 transition"
                >
                  + List a Property
                </button>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Properties */}
      <main
        id="properties"
        className="max-w-7xl mx-auto px-6 py-14"
      >

        {/* Section Header */}
        <div className="flex flex-col md:flex-row
          md:justify-between md:items-end gap-6 mb-10">

          <div>

            <p className="text-blue-600 font-semibold text-sm
              uppercase tracking-wider">
              Explore
            </p>

            <h2 className="text-3xl md:text-4xl font-bold
              text-gray-900 mt-2">
              Available Properties
            </h2>

            <p className="text-gray-500 mt-2">
              Discover your next home from our available listings.
            </p>

          </div>

          <div className="flex items-center gap-2
            bg-white border border-gray-200
            rounded-xl px-4 py-3 shadow-sm">

            <span className="text-blue-600 font-bold">
              {properties.length}
            </span>

            <span className="text-gray-500 text-sm">
              {properties.length === 1
                ? "property available"
                : "properties available"}
            </span>

          </div>

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-7">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl overflow-hidden
                  border border-gray-100 shadow-sm animate-pulse"
              >

                <div className="h-52 bg-gray-200" />

                <div className="p-6 space-y-4">

                  <div className="h-5 bg-gray-200
                    rounded w-3/4" />

                  <div className="h-4 bg-gray-200
                    rounded w-full" />

                  <div className="h-4 bg-gray-200
                    rounded w-1/2" />

                  <div className="h-10 bg-gray-200
                    rounded mt-5" />

                </div>

              </div>
            ))}

          </div>
        )}

        {/* Empty State */}
        {!loading && properties.length === 0 && (
          <div className="bg-white rounded-2xl
            border border-gray-100 shadow-sm
            p-16 text-center">

            <div className="w-20 h-20 mx-auto
              bg-blue-50 rounded-full
              flex items-center justify-center">

              <span className="text-4xl">
                🏠
              </span>

            </div>

            <h3 className="text-2xl font-bold
              text-gray-900 mt-6">

              No properties available

            </h3>

            <p className="text-gray-500 mt-2 max-w-md
              mx-auto">

              There are currently no rental properties listed.
              Check back later for new listings.

            </p>

            {role === "landlord" && (
              <button
                onClick={() => navigate("/create-property")}
                className="mt-7 bg-blue-600 text-white
                  px-6 py-3 rounded-xl font-semibold
                  hover:bg-blue-700 transition"
              >
                Create Your First Property
              </button>
            )}

          </div>
        )}

        {/* Property Grid */}
        {!loading && properties.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-7">

            {properties.map((property) => (
              <PropertyCard
              key={property.id}
              property={property}
              role={role}
              onApply={applyForProperty}
              onDelete={deleteProperty}
              />
            ))}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8
          flex flex-col md:flex-row
          justify-between items-center gap-4">

          <p className="text-gray-500 text-sm">
            © 2026 Rental Access Platform
          </p>

          <p className="text-gray-400 text-sm">
            Find your next home with confidence.
          </p>

        </div>
      </footer>

    </div>
  )
}

export default Properties

