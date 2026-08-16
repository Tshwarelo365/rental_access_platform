
import { useEffect, useState } from "react"
import api from "../api/axios"
import Navbar from "../components/Navbar"

function LandlordDashboard() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/landlord")
      setApplications(res.data)
    } catch (err) {
      console.log("Error loading applications")
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/applications/${id}?status=${status}`)
      fetchApplications()
    } catch (err) {
      alert(
        err.response?.data?.detail ||
        "Failed to update application"
      )
    }
  }

  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length

  const approvedCount = applications.filter(
    (app) => app.status === "approved"
  ).length

  const rejectedCount = applications.filter(
    (app) => app.status === "rejected"
  ).length

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Header */}
      <section className="bg-gradient-to-br
        from-blue-700 via-blue-600 to-indigo-700
        text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <p className="text-blue-200 font-semibold
            text-sm uppercase tracking-wider">

            Landlord Dashboard

          </p>

          <h1 className="text-4xl md:text-5xl
            font-bold mt-2">

            Manage your applications

          </h1>

          <p className="text-blue-100 mt-4
            max-w-2xl text-lg">

            Review tenant applications and manage
            your rental property requests.

          </p>

        </div>

      </section>

      {/* Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Statistics */}
        <div className="grid grid-cols-1
          sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* Total */}
          <div className="bg-white rounded-2xl
            border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between
              items-start">

              <div>
                <p className="text-sm text-gray-500
                  font-medium">

                  Total Applications

                </p>

                <p className="text-3xl font-bold
                  text-gray-900 mt-2">

                  {applications.length}

                </p>
              </div>

              <div className="w-11 h-11
                rounded-xl bg-blue-50
                flex items-center justify-center">

                <span className="text-xl">
                  📋
                </span>

              </div>

            </div>

          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl
            border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between
              items-start">

              <div>
                <p className="text-sm text-gray-500
                  font-medium">

                  Pending

                </p>

                <p className="text-3xl font-bold
                  text-yellow-600 mt-2">

                  {pendingCount}

                </p>
              </div>

              <div className="w-11 h-11
                rounded-xl bg-yellow-50
                flex items-center justify-center">

                <span className="text-xl">
                  ⏳
                </span>

              </div>

            </div>

          </div>

          {/* Approved */}
          <div className="bg-white rounded-2xl
            border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between
              items-start">

              <div>
                <p className="text-sm text-gray-500
                  font-medium">

                  Approved

                </p>

                <p className="text-3xl font-bold
                  text-green-600 mt-2">

                  {approvedCount}

                </p>
              </div>

              <div className="w-11 h-11
                rounded-xl bg-green-50
                flex items-center justify-center">

                <span className="text-xl">
                  ✓
                </span>

              </div>

            </div>

          </div>

          {/* Rejected */}
          <div className="bg-white rounded-2xl
            border border-gray-100 shadow-sm p-6">

            <div className="flex justify-between
              items-start">

              <div>
                <p className="text-sm text-gray-500
                  font-medium">

                  Rejected

                </p>

                <p className="text-3xl font-bold
                  text-red-600 mt-2">

                  {rejectedCount}

                </p>
              </div>

              <div className="w-11 h-11
                rounded-xl bg-red-50
                flex items-center justify-center">

                <span className="text-xl">
                  ✕
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Applications Header */}
        <div className="flex flex-col sm:flex-row
          sm:justify-between sm:items-end gap-4 mb-7">

          <div>

            <p className="text-blue-600 font-semibold
              text-sm uppercase tracking-wider">

              Applications

            </p>

            <h2 className="text-3xl font-bold
              text-gray-900 mt-1">

              Tenant Requests

            </h2>

            <p className="text-gray-500 mt-1">

              Review and manage rental applications.

            </p>

          </div>

          {pendingCount > 0 && (
            <div className="bg-yellow-50
              border border-yellow-100
              text-yellow-700 px-4 py-2
              rounded-xl text-sm font-semibold">

              {pendingCount} awaiting review

            </div>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1
            md:grid-cols-2 gap-6">

            {[1, 2].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl
                  border border-gray-100 p-6
                  animate-pulse"
              >

                <div className="h-5 bg-gray-200
                  rounded w-2/3 mb-4" />

                <div className="h-4 bg-gray-200
                  rounded w-1/2 mb-6" />

                <div className="h-10 bg-gray-200
                  rounded" />

              </div>
            ))}

          </div>
        )}

        {/* Empty State */}
        {!loading && applications.length === 0 && (
          <div className="bg-white rounded-2xl
            border border-gray-100
            shadow-sm p-16 text-center">

            <div className="w-20 h-20 mx-auto
              rounded-full bg-blue-50
              flex items-center justify-center">

              <span className="text-4xl">
                📋
              </span>

            </div>

            <h3 className="text-2xl font-bold
              text-gray-900 mt-6">

              No applications yet

            </h3>

            <p className="text-gray-500
              max-w-md mx-auto mt-2">

              When tenants apply for your properties,
              their applications will appear here.

            </p>

          </div>
        )}

        {/* Applications */}
        {!loading && applications.length > 0 && (
          <div className="grid grid-cols-1
            lg:grid-cols-2 gap-6">

            {applications.map((app) => (

              <div
                key={app.id}
                className="bg-white rounded-2xl
                  border border-gray-100
                  shadow-sm hover:shadow-md
                  transition p-6"
              >

                {/* Card Header */}
                <div className="flex justify-between
                  items-start gap-4">

                  <div>

                    <p className="text-xs
                      text-blue-600 font-semibold
                      uppercase tracking-wider">

                      Property

                    </p>

                    <h3 className="text-xl
                      font-bold text-gray-900 mt-1">

                      {app.property_title}

                    </h3>

                  </div>

                  {/* Status */}
                  {app.status === "pending" && (
                    <span className="bg-yellow-100
                      text-yellow-700
                      text-xs font-bold
                      px-3 py-1.5
                      rounded-full">

                      Pending

                    </span>
                  )}

                  {app.status === "approved" && (
                    <span className="bg-green-100
                      text-green-700
                      text-xs font-bold
                      px-3 py-1.5
                      rounded-full">

                      Approved

                    </span>
                  )}

                  {app.status === "rejected" && (
                    <span className="bg-red-100
                      text-red-700
                      text-xs font-bold
                      px-3 py-1.5
                      rounded-full">

                      Rejected

                    </span>
                  )}

                </div>

                {/* Tenant */}
                <div className="mt-6
                  bg-gray-50 rounded-xl p-4">

                  <p className="text-xs
                    text-gray-400 uppercase
                    font-semibold tracking-wider">

                    Applicant

                  </p>

                  <p className="text-gray-800
                    font-medium mt-1">

                    {app.tenant_email}

                  </p>

                </div>

                {/* Actions */}
                {app.status === "pending" && (
                  <div className="flex gap-3 mt-6">

                    <button
                      onClick={() =>
                        updateStatus(
                          app.id,
                          "approved"
                        )
                      }
                      className="flex-1
                        bg-green-600
                        text-white
                        py-2.5
                        rounded-xl
                        font-semibold
                        hover:bg-green-700
                        transition"
                    >
                      ✓ Approve
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(
                          app.id,
                          "rejected"
                        )
                      }
                      className="flex-1
                        bg-white
                        text-red-600
                        border border-red-200
                        py-2.5
                        rounded-xl
                        font-semibold
                        hover:bg-red-50
                        transition"
                    >
                      ✕ Reject
                    </button>

                  </div>
                )}

                {/* Processed message */}
                {app.status !== "pending" && (
                  <div className="mt-6 pt-4
                    border-t border-gray-100">

                    <p className="text-sm
                      text-gray-400">

                      This application has already
                      been processed.

                    </p>

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

export default LandlordDashboard

