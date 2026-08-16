
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import Navbar from "../components/Navbar"

function LandlordApplications() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token || role !== "landlord") {
      navigate("/")
      return
    }

    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/landlord")

      console.log("LANDLORD APPLICATIONS:", response.data)

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

  const updateStatus = async (applicationId, status) => {
    try {
      await api.put(
        `/applications/${applicationId}/status?status=${status}`
      )

      alert(
        status === "approved"
          ? "Application approved!"
          : "Application rejected!"
      )

      fetchApplications()
    } catch (error) {
      alert(
        error.response?.data?.detail ||
        "Failed to update application"
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      

      {/* Applications */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {loading && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              Loading applications...
            </p>
          </div>
        )}

        {!loading && applications.length === 0 && (
          <div className="bg-white rounded-2xl shadow-sm
            border border-gray-100 p-12 text-center">

            <div className="text-5xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              No applications yet
            </h2>

            <p className="text-gray-500 mt-2">
              Applications from tenants will appear here.
            </p>

          </div>
        )}

        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2
            lg:grid-cols-3 gap-6">

            {applications.map((application) => (
              <div
                key={application.id}
                className="bg-white rounded-2xl border
                border-gray-100 shadow-sm p-6"
              >

                <div className="flex justify-between
                  items-start gap-4">

                  <div>
                    <p className="text-sm text-gray-400">
                      Property
                    </p>

                    <h2 className="text-xl font-bold
                      text-gray-900">
                      {application.property_title}
                    </h2>
                  </div>

                  <span
                    className={`text-xs font-semibold px-3 py-1
                    rounded-full ${
                      application.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : application.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {application.status}
                  </span>

                </div>

                <div className="border-t border-gray-100
                  mt-5 pt-5">

                  <p className="text-sm text-gray-400">
                    Tenant
                  </p>

                  <p className="font-semibold text-gray-900 mt-1">
                    {application.tenant_email}
                  </p>

                </div>

                {application.status === "pending" && (
                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "approved"
                        )
                      }
                      className="flex-1 bg-green-600 text-white
                      py-2.5 rounded-lg font-semibold
                      hover:bg-green-700 transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          application.id,
                          "rejected"
                        )
                      }
                      className="flex-1 bg-red-600 text-white
                      py-2.5 rounded-lg font-semibold
                      hover:bg-red-700 transition"
                    >
                      Reject
                    </button>

                  </div>
                )}

              </div>
            ))}

          </div>
        )}

      </main>

    </div>
  )
}

export default LandlordApplications

