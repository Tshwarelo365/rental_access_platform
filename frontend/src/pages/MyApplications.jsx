
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import Navbar from "../components/Navbar"
import logo from "../assets/logo.jpg"

function MyApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "tenant") {
      navigate("/")
      return
    }

    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/my")

      console.log("MY APPLICATIONS:", response.data)

      setApplications(response.data)
    } catch (error) {
      console.error(
        "Failed to load applications:",
        error.response?.data || error.message
      )
    } finally {
      setLoading(false)
    }
  }

  const getStatusStyle = (status) => {
    if (status === "approved") {
      return "bg-green-100 text-green-700"
    }

    if (status === "rejected") {
      return "bg-red-100 text-red-700"
    }

    return "bg-yellow-100 text-yellow-700"
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Header */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <p className="text-blue-200 font-semibold text-sm">
            TENANT DASHBOARD
          </p>

          <h1 className="text-4xl font-bold mt-2">
            My Applications
          </h1>

          <p className="text-blue-100 mt-3">
            Track the status of your rental applications.
          </p>

        </div>
      </section>

      {/* Applications */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Loading your applications...
            </p>
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className="bg-white rounded-2xl border
            border-gray-100 shadow-sm p-12 text-center">

            <img
              src={logo}
              alt="Rental Access Logo"
              className="w-50 h-20 rounded-xl object-cover"
            />

            <h2 className="text-2xl font-bold text-gray-900">
              No applications yet
            </h2>

            <p className="text-gray-500 mt-2">
              You haven't applied for any properties yet.
            </p>

            <button
              onClick={() => navigate("/properties")}
              className="mt-6 bg-blue-600 text-white
                px-6 py-3 rounded-lg font-semibold
                hover:bg-blue-700 transition"
            >
              Browse Properties
            </button>

          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-6">

            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl border
                  border-gray-100 shadow-sm overflow-hidden"
              >

                {/* Property Image */}
                <div className="h-40 bg-gradient-to-br
                  from-blue-100 to-blue-200 flex
                  items-center justify-center">

                  <span className="text-5xl">
                    🏠
                  </span>

                </div>

                <div className="p-6">

                  <div className="flex justify-between
                    items-start gap-4">

                    <div>

                      <p className="text-sm text-gray-400">
                        Property
                      </p>

                      <h2 className="text-xl font-bold
                        text-gray-900 mt-1">
                        {application.property_title}
                      </h2>

                    </div>

                    <span
                      className={`text-xs font-semibold
                        px-3 py-1 rounded-full capitalize
                        ${getStatusStyle(application.status)}`}
                    >
                      {application.status}
                    </span>

                  </div>

                  <div className="mt-5 space-y-2">

                    <p className="text-gray-600">
                      📍 {application.property_location}
                    </p>

                    <p className="text-xl font-bold text-blue-600">
                      R{application.property_price}
                      <span className="text-sm text-gray-400
                        font-normal">
                        {" "} / month
                      </span>
                    </p>

                  </div>

                  <div className="border-t border-gray-100
                    mt-5 pt-4">

                    <p className="text-sm text-gray-400">
                      Application status
                    </p>

                    <p className="font-semibold text-gray-800
                      capitalize mt-1">
                      {application.status}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}

export default MyApplications

